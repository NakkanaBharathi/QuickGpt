import express from "express";
import { createChat, deleteChat, getChats } from "../controllers/chatController.js";
import { protect } from "../middlewares/auth.js";

const chatRouter = express.Router();

// Create a new chat
chatRouter.post("/create", protect, createChat); // ✅ POST instead of GET

// Get all chats
chatRouter.get("/get", protect, getChats);

// Delete a chat
chatRouter.delete("/delete", protect, deleteChat); // ✅ DELETE instead of POST

export default chatRouter;
