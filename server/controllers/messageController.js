// controllers/messageController.js
import connectDB from "../configs/db.js";
import OpenAI from "../configs/openai.js";
import Chat from "../models/Chat.js";
import User from "../models/User.js";
import imageKit from "../configs/imagekit.js";
/* -------------------------------
   🧠 TEXT MESSAGE CONTROLLER
--------------------------------*/
export const textMessageController = async (req, res) => {
  try {
    await connectDB();

    const userId = req.user._id;

    // Check user credits
    if (req.user.credits < 1) {
      return res.status(400).json({
        success: false,
        message: "You don't have enough credits to use this feature.",
      });
    }

    const { chatId, prompt } = req.body;
    const chat = await Chat.findOne({ userId, _id: chatId });
    if (!chat) {
      return res.status(404).json({ success: false, message: "Chat not found." });
    }

    // Save user message
    chat.messages.push({
      role: "user",
      content: prompt,
      timestamp: Date.now(),
      isImage: false,
    });

    // Get AI reply
    const completion = await OpenAI.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });

    const reply = {
      ...completion.choices[0].message,
      timestamp: Date.now(),
      isImage: false,
    };

    // Send response to frontend
    res.status(200).json({ success: true, reply });

    // Save to DB and deduct credit
    chat.messages.push(reply);
    await chat.save();
    await User.updateOne({ _id: userId }, { $inc: { credits: -1 } });
  } catch (error) {
    console.error("Text Message Error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

/* -------------------------------
   🎨 IMAGE MESSAGE CONTROLLER
--------------------------------*/
export const imageMessageController = async (req, res) => {
  try {
    await connectDB();

    const userId = req.user._id;

    // Check credits
    if (req.user.credits < 2) {
      return res.status(400).json({
        success: false,
        error: "You don't have enough credits to use this feature.",
      });
    }

    const { prompt, chatId, isPublished } = req.body;
    const chat = await Chat.findOne({ userId, _id: chatId });
    if (!chat) {
      return res.status(404).json({ success: false, message: "Chat not found." });
    }

    // Save user message
    chat.messages.push({
      role: "user",
      content: prompt,
      timestamp: Date.now(),
      isImage: false,
    });

    // Generate ImageKit AI image URL
    const encodedPrompt = encodeURIComponent(prompt);
    const imageUrl = `${process.env.IMAGEKIT_URL_ENDPOINT}/ik-genimg-prompt-${encodedPrompt}/quickgpt/${Date.now()}.png?tr=w-800,h-800`;

    const reply = {
      role: "assistant",
      content: imageUrl,
      timestamp: Date.now(),
      isImage: true,
      isPublished,
    };

    // Send response
    res.status(200).json({ success: true, reply });

    // Save chat + deduct credits
    chat.messages.push(reply);
    await chat.save();
    await User.updateOne({ _id: userId }, { $inc: { credits: -2 } });
  } catch (error) {
    console.error("Image Message Error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};
