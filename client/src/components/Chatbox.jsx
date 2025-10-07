import React, { useState, useEffect, useRef } from "react";
import { useAppContext } from "../context/AppContext";
import assets from "../assets/assets";
import Message from "./Message";

const Chatbox = () => {
  const containerRef=useRef(null)
  const { selectedChat, theme } = useAppContext();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [mode, setMode] = useState("text");
  const [isPublished, setIspublished] = useState(false);
  const messagesEndRef = useRef(null);

  // Load messages from selected chat
  useEffect(() => {
    if (selectedChat) {
      setMessages(selectedChat.messages);
    } else {
      setMessages([]);
    }
  }, [selectedChat]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ 
        top:messagesEndRef.current.scrollHeight,
        behavior: "smooth" });
    }
  }, [messages]);

  // Handle submitting a new message
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessage = {
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput("");

    // Simulate assistant response
    setLoading(true);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            mode === "image"
              ? "https://placekitten.com/400/300" // 🐱 sample image
              : "This is a sample assistant reply ✨",
          timestamp: new Date(),
        },
      ]);
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Chat Messages */}
      <div ref={messagesEndRef}className="flex-1 overflow-y-auto px-5 md:px-10 xl:mx-30 2xl:pr-40">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center gap-2 text-primary">
            <img
              src={theme === "dark" ? assets.logo_full : assets.logo_full_dark}
              alt="Chat Logo"
              className="w-full max-w-56 sm:max-w-68"
            />
            <p className="mt-5 text-4xl sm:text-6xl text-center text-gray-400 dark:text-white">
              Ask me Anything.
            </p>
          </div>
        )}

        {messages.map((message, index) => (
          <Message key={index} message={message} />
        ))}

        {/* Three dots Loading */}
        {loading && (
          <div className="loader flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-gray-500 dark:bg-white animate-bounce"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-gray-500 dark:bg-white animate-bounce"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-gray-500 dark:bg-white animate-bounce"></div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>
      {mode==="image" && (
        <label className="inline-flex items-center gap-2 mb-3 text-sm mx-auto">
          <p className="text-xs">Publish Generated Image to Community</p>
          <input type="checkbox" className="cursor-pointer" checked={isPublished} onChange={(e)=>setIspublished(e.target.checked)}/>
          </label>
      )}

      {/* Input Box Fixed at Bottom with same width as messages */}
      <form
        onSubmit={handleSubmit}
        className="sticky bottom-0 flex justify-center p-3 bg-transparent"
      >
        <div className="w-full max-w-2xl flex items-center gap-3 bg-primary/20 dark:bg-[#583C79]/30 border border-primary dark:border-[#80609F]/30 rounded-full p-2 pl-4">
          <select
            onChange={(e) => setMode(e.target.value)}
            value={mode}
            className="text-sm pl-2 pr-2 outline-none rounded-md bg-transparent"
          >
            <option className="dark:bg-purple-900" value="text">
              Text
            </option>
            <option className="dark:bg-purple-900" value="image">
              Image
            </option>
          </select>

          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            type="text"
            placeholder="Type your prompt here..."
            className="flex-1 text-sm outline-none bg-transparent"
            required
          />

          <button type="submit" disabled={loading}>
            <img
              src={loading ? assets.stop_icon : assets.send_icon}
              className="w-8 cursor-pointer"
              alt=""
            />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chatbox;
