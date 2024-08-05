const express = require("express");
const router = express.Router();
const User = require("../models/User");
const transporter = require("../utils/nodemailer.js");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const fs = require("fs");
const path = require("path");
const passport = require("passport");
const {
  hashPassword,
  checkPassword,
  generateAndSetToken,
} = require("../utils/auth.utils.js");
require("dotenv").config();

// Path to the email template
const templatePath = path.join(__dirname, "../templates/emailTemplate.html");

// Helper function to load and replace placeholders in the template
const loadTemplate = (verificationLink) => {
  let template = fs.readFileSync(templatePath, "utf8");
  return template.replace(/{{verificationLink}}/g, verificationLink);
};

// Custom error handler
const errorHandler = (statusCode, message) => {
  const error = new Error();
  error.statusCode = statusCode;
  error.message = message;
  return error;
};

// Signup route
router.post("/signup", async (req, res, next) => {
  try {
    console.log(req.body);
    const { email, password, name } = req.body;
    // Check if email is already registered
    let user = await User.findOne({ email });
    if (user) {
      if (user.verified) {
        return next(errorHandler(400, "Email already registered."));
      }

      // If the email exists but is not verified, resend verification link
      const verificationToken = crypto.randomBytes(32).toString("hex");
      user.verificationToken = verificationToken;
      await user.save();

      const verificationLink = `${process.env.FRONTEND_URL}/verify/${verificationToken}`;
      const emailContent = loadTemplate(verificationLink);

      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Verify Your Email",
        html: emailContent,
      });

      return res.status(200).json({
        message: "Verification email resent. Please check your email.",
      });
    }

    const hashedPassword = await hashPassword(password);
    const verificationToken = crypto.randomBytes(32).toString("hex");
    console.log(password);
    user = new User({
      email,
      name,
      password: hashedPassword,
      verificationToken,
    });
    await user.save();

    const verificationLink = `${process.env.FRONTEND_URL}/verify/${verificationToken}`;
    const emailContent = loadTemplate(verificationLink);

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Verify Your Email",
      html: emailContent,
    });

    generateAndSetToken(user._id, res);
    res
      .status(201)
      .json({ message: "Signup successful. Please verify your email." });
  } catch (error) {
    next(error);
  }
});

// Verify Email
router.get("/verify/:token", async (req, res, next) => {
  try {
    const user = await User.findOne({ verificationToken: req.params.token });
    console.log(user);
    if (!user) return next(errorHandler(400, "Invalid token."));

    user.verified = true;
    user.verificationToken = undefined;
    await user.save();

    res.redirect(`${process.env.FRONTEND_URL}/auth`);
  } catch (error) {
    console.error(error); // Log error for debugging
    next(errorHandler(500, "Server error"));
  }
});

// Resend Verification Link
router.post("/resend-verification", async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) return next(errorHandler(400, "Email not registered."));

    if (user.verified)
      return next(errorHandler(400, "Email already verified."));

    const verificationToken = crypto.randomBytes(32).toString("hex");
    user.verificationToken = verificationToken;
    await user.save();

    const verificationLink = `${process.env.FRONTEND_URL}/verify/${verificationToken}`;
    const emailContent = loadTemplate(verificationLink);

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Verify Your Email",
      html: emailContent,
    });

    res.send("Verification link sent.");
  } catch (error) {
    console.error(error); // Log error for debugging
    next(errorHandler(500, "Server error"));
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user || !user.verified) {
      return next(
        errorHandler(400, "Invalid credentials or email not verified.")
      );
    }

    const isMatch = await checkPassword(password, user.password);
    if (!isMatch) {
      return next(errorHandler(401, "Email or password incorrect"));
    }

    // Generate token and set it as a cookie
    generateAndSetToken(user._id, res);

    const { password: _, ...userData } = user._doc;

    res.status(200).json(userData);
  } catch (error) {
    console.log(error);
    console.error(error); // Log error for debugging
    next(errorHandler(500, "Server error"));
  }
});

// Google OAuth login route
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

// Google OAuth callback route
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/auth",
    session: true,
  }),
  (req, res, next) => {
    try {
      generateAndSetToken(req.user._id, res);
      const { password: _, ...userData } = req.user._doc;
      res.redirect(`${process.env.FRONTEND_URL}/profile`);
    } catch (error) {
      console.error(error); // Log error for debugging
      next(errorHandler(500, "Server error"));
    }
  }
);

// Logout route
router.get("/logout", (req, res, next) => {
  res.clearCookie("access_token");
  req.logout((err) => {
    if (err) {
      console.error(err);
      return next(errorHandler(500, "Server error"));
    }
    res.redirect("/");
  });
});

// Path to the password reset email template
const resetTemplatePath = path.join(
  __dirname,
  "../templates/resetTemplate.html"
);

// Helper function to load and replace placeholders in the reset template
const loadResetTemplate = (resetLink) => {
  let template = fs.readFileSync(resetTemplatePath, "utf8");
  return template.replace(/{{resetLink}}/g, resetLink);
};

router.post("/forgot-password", async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) return next(errorHandler(400, "Email not registered."));

    // Generate a reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetToken = resetToken;
    user.resetTokenExpires = Date.now() + 3600000; // 1 hour from now
    await user.save();

    // Create reset link
    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
    const emailContent = loadResetTemplate(resetLink);

    // Send reset email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset",
      html: emailContent,
    });

    res.status(200).json({ message: "Password reset email sent." });
  } catch (error) {
    console.error(error);
    next(errorHandler(500, "Server error"));
  }
});

router.post("/reset-password/:token", async (req, res, next) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    // Find user with the reset token and check if the token has expired
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpires: { $gt: Date.now() }, // Check if the token is still valid
    });

    if (!user) return next(errorHandler(400, "Invalid or expired token."));

    // Hash the new password and save it
    user.password = await bcrypt.hash(password, 10);
    user.resetToken = undefined;
    user.resetTokenExpires = undefined;
    await user.save();

    res.status(200).json({ message: "Password reset successful." });
  } catch (error) {
    console.error(error);
    next(errorHandler(500, "Server error"));
  }
});

module.exports = router;
