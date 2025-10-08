// routes/chatRoutes.js
import express from "express";
import { createChat, deleteChat, getChats } from "../controllers/chatController.js";
import { protect } from "../middlewares/auth.js";

const chatRouter = express.Router();

// Create a new chat
chatRouter.post("/create", protect, createChat);

// Get all chats
chatRouter.get("/get", protect, getChats);

// Delete a chat
chatRouter.delete("/delete", protect, deleteChat);

export default chatRouter;
