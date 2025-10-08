// routes/messageRoutes.js
import express from "express";
import { protect } from "../middlewares/auth.js";
import { textMessageController, imageMessageController } from "../controllers/messageController.js";

const messageRouter = express.Router();

// Text message (protected)
messageRouter.post("/text", protect, textMessageController);

// Image message (protected)
messageRouter.post("/image", protect, imageMessageController);

export default messageRouter;
