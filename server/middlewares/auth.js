// middlewares/auth.js
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import connectDB from "../configs/db.js";

// Protect function for Vercel API routes
export const protect = (handler) => {
  return async (req, res) => {
    await connectDB();

    try {
      const token = req.headers.authorization;
      if (!token) {
        return res.status(401).json({ success: false, message: "Not authorized, no token" });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id);
      if (!user) {
        return res.status(401).json({ success: false, message: "Not authorized, user not found" });
      }

      req.user = user;
      // Call the actual API handler
      return handler(req, res);
    } catch (error) {
      return res.status(401).json({ success: false, message: "Not authorized, token failed" });
    }
  };
};
