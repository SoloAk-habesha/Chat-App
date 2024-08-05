import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";
import User from "../models/User.js"; // Import your user model

export const verifyToken = async (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) return next(errorHandler(401, "Unauthorized"));

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) return next(errorHandler(401, "Unauthorized"));

    try {
      // Assuming the decoded token includes userId
      const userId = decoded.userId;

      // Retrieve the user model
      const user = await User.findById(userId);
      if (!user) return next(errorHandler(404, "User not found"));

      req.user = user;
      next();
    } catch (error) {
      return next(errorHandler(500, "Internal Server Error"));
    }
  });
};
