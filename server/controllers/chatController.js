// controllers/chatController.js
import Chat from "../models/Chat.js";
import connectDB from "../configs/db.js";

// Create a new chat
export const createChat = async (req, res) => {
  try {
    await connectDB(); // ensure DB is connected

    const userId = req.user._id; // make sure req.user is set in your API handler
    const chatData = {
      userId,
      messages: [],
      name: "New Chat",
      userName: req.user.name,
    };

    await Chat.create(chatData);

    res.status(200).json({ success: true, message: "Chat is created" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get all chats
export const getChats = async (req, res) => {
  try {
    await connectDB();

    const userId = req.user._id;
    const chats = await Chat.find({ userId }).sort({ updatedAt: -1 });

    res.status(200).json({ success: true, chats });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Delete a chat
export const deleteChat = async (req, res) => {
  try {
    await connectDB();

    const userId = req.user._id;
    const { chatId } = req.body;

    await Chat.deleteOne({ _id: chatId, userId });

    res.status(200).json({ success: true, message: "Chat deleted" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
