import Chat from "../models/Chat.js"; // ✅ Import Chat model

// API Controller for creating a new chat
export const createChat = async (req, res) => {
  try {
    const userId = req.user._id;
    const chatData = {
      userId,
      messages: [],
      name: "New Chat",
      userName: req.user.name,
    };

    await Chat.create(chatData);

    res.json({ success: true, message: "Chat is created" }); // ✅ corrected response
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// API Controller for getting all chats
export const getChats = async (req, res) => {
  try {
    const userId = req.user._id;
    const chats = await Chat.find({ userId }).sort({ updatedAt: -1 });

    res.json({ success: true, chats }); // ✅ corrected spelling
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// API Controller for deleting a chat
export const deleteChat = async (req, res) => {
  try {
    const userId = req.user._id;
    const { chatId } = req.body;

    await Chat.deleteOne({ _id: chatId, userId }); // ✅ corrected deleteOne

    res.json({ success: true, message: "Chat deleted" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
