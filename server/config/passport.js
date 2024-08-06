const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const jwt = require("jsonwebtoken");

// Function to generate a random password
async function generateHashedPassword(length = 12) {
  const password = crypto.randomBytes(length).toString("hex");
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

// Use the GoogleStrategy within Passport.
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.FRONTEND_URL}/api/auth/google/callback`,
      scope: ["profile", "email"],
      prompt: "select_account",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;

        // Check if user already exists in our db
        let user = await User.findOne({ email });

        if (user) {
          if (!user.verified) {
            user.verified = true;
            await user.save();
          }
          return done(null, user);
        }

        // If user not found, create a new user
        const hashedPassword = await generateHashedPassword();

        user = await new User({
          googleId: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value,
          profile: profile.photos[0].value,
          password: hashedPassword, // Store the generated hashed password
          verified: true, // Set verified to true for OAuth users
        }).save();

        done(null, user);
      } catch (err) {
        console.error(err);
        done(err); // Pass error to the `done` callback
      }
    }
  )
);

// Serialize user information into the session
passport.serializeUser((user, done) => {
  done(null, user.id); // Storing only user id in session
});

// Deserialize user from the session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      return done(new Error("User not found"), null);
    }
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});
