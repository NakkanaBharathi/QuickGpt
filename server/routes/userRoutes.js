// routes/userRoutes.js
import express from "express";
import { registerUser, loginUser, getUser, getPublishedImages } from "../controllers/userController.js";
import { protect } from "../middlewares/auth.js";

const userRouter = express.Router();

// Register new user
userRouter.post("/register", registerUser);

// Login user
userRouter.post("/login", loginUser);

// Get logged-in user data (protected)
userRouter.get("/data", protect, getUser);

// Get published images (public)
userRouter.get("/published-images", getPublishedImages);

export default userRouter;
