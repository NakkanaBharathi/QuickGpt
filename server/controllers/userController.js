// userController.js
import Chat from "../models/Chat.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// REGISTER
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    const user = await User.create({ name, email, password }); // ❌ no manual hash

    const token = generateToken(user._id);
    return res.status(201).json({ success: true, token });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// LOGIN
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = generateToken(user._id);
      return res.json({ success: true, token });
    }

    return res.status(400).json({ success: false, message: "Invalid email or password" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GET USER
export const getUser = async (req, res) => {
  try {
    const user = req.user;
    return res.json({ success: true, user });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}
//API TO GET PUBLISHED IMAGES
export const getPublishedImages = async (req, res) => {
  try{
    const publishedImageMessages=await Chat.aggregate([
      {$unwind:"messages"},
      {
        $match:{"messages.isImage":true,
          "messages.isPublished":true
        }
          
      },
      {
        $project:{
          _id:0,
          imageUrl:"$messages.content",
          userName:"$userName",

        }
      }
    ])
    res.json({success:true,images:publishedImageMessages})
    
  }catch(error){
    return res.json({success:false,message:error.message})

  }
}
