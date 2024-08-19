const express = require("express");
const passport = require("passport");
const session = require("express-session");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes.js");
const userRoute = require("./routes/userRoute.js");
const chatRoutes = require("./routes/chatRoutes.js");
const { app, io, server } = require("./socket/socket.js");
const cors = require("cors");
require("./config/passport.js");
const cookieParser = require("cookie-parser");
const { verifyToken } = require("./utils/verifyUser.js");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoute);
app.use("/api/chat", verifyToken, chatRoutes);

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
app.set("io", io);
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
