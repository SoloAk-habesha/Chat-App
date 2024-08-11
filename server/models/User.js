const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    profile: {
      type: String,
      default:
        "https://lh3.googleusercontent.com/a/ACg8ocJuy1Akza1IMJyDSTbGj-POlosaZdd_sDaPjygRm1wHON_fY0c=s96-c",
    },
    verified: { type: Boolean, default: false },
    verificationToken: { type: String },
    resetToken: { type: String },
    resetTokenExpires: { type: Date },
    googleId: { type: String },
    coverPhoto: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZSN9l2HFI-fPjJniiWjBs-oMXWgzE1bVw_g&s",
    },
    profilePicture: {
      type: String,
      default:
        "https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAxL3JtNjA5LXNvbGlkaWNvbi13LTAwMi1wLnBuZw.png",
    },
    phone: { type: String, trim: true },
    biography: { type: String, trim: true },
    dateOfBirth: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
