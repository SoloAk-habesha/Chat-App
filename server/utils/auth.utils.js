const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Hash password
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};
const checkPassword = async (inputPassword, userPassword) => {
  const isMatch = await bcrypt.compare(inputPassword, userPassword);
  return isMatch;
};
// utils/auth.utils.js

const generateAndSetToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "2d",
  });

  res.cookie("access_token", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  });

  return token;
};

module.exports = {
  hashPassword,
  checkPassword,
  generateAndSetToken,
};
