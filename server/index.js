const express = require("express");
const passport = require("passport");
const session = require("express-session");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes.js"); // Adjust the path to your auth routes
require("./config/passport.js"); // Import passport configuration
const cookieParser = require("cookie-parser");
const app = express();
const cors = require("cors");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(
  session({
    secret: process.env.SESSION_SECRET || "your_default_session_secret", // Use a dedicated session secret
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Use auth routes
app.use("/api/auth", authRoutes);

// Error handling middleware
app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    statusCode,
    message: error.message || "Server error",
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
