// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { verifyToken } = require("../utils/verifyUser.js");

// Route to get user information
router.get("/me", verifyToken, async (req, res, next) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
});
// Update user profile
router.put("/updateProfile", verifyToken, async (req, res) => {
  try {
    const userId = req.user._id;

    const { name, email, phone, biography, dateOfBirth } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email, phone, biography, dateOfBirth },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update profile. Please try again." });
  }
});

router.post("/uploadPhoto", verifyToken, async (req, res) => {
  try {
    const userId = req.user._id;
    const { photoUrl, type } = req.body;

    if (!["coverPhoto", "profilePicture"].includes(type)) {
      return res.status(400).json({ message: "Invalid photo type." });
    }

    const updateData = { [type]: photoUrl };
    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    });

    res.status(200).json(updatedUser);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to upload photo. Please try again." });
  }
});

// Delete user account
router.delete("/deleteAccount", verifyToken, async (req, res) => {
  try {
    const userId = req.user._id;
    await User.findByIdAndDelete(userId);
    res.status(200).json({ message: "Account successfully deleted." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete account. Please try again." });
  }
});

module.exports = router;
