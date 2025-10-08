// controllers/userController.js
import Chat from "../models/Chat.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import connectDB from "../configs/db.js";

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// REGISTER
export const registerUser = async (req, res) => {
  try {
    await connectDB();

    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({ name, email, password: hashedPassword });

    const token = generateToken(user._id);
    return res.status(201).json({ success: true, token });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// LOGIN
export const loginUser = async (req, res) => {
  try {
    await connectDB();

    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = generateToken(user._id);
      return res.status(200).json({ success: true, token });
    }

    return res.status(400).json({ success: false, message: "Invalid email or password" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GET USER
export const getUser = async (req, res) => {
  try {
    await connectDB();

    const user = req.user; // make sure req.user is populated via token verification
    return res.status(200).json({ success: true, user });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GET PUBLISHED IMAGES
export const getPublishedImages = async (req, res) => {
  try {
    await connectDB();

    const publishedImageMessages = await Chat.aggregate([
      { $unwind: "$messages" },
      {
        $match: {
          "messages.isImage": true,
          "messages.isPublished": true,
        },
      },
      {
        $project: {
          _id: 0,
          imageUrl: "$messages.content",
          userName: "$userName",
        },
      },
    ]);

    res.status(200).json({ success: true, images: publishedImageMessages });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
