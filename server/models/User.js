const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String },
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
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
