import React, { useEffect, useState } from "react";
import assets from "../assets/assets";
import moment from "moment";
import Markdown from "react-markdown";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css"; // Prism theme

const Message = ({ message }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    Prism.highlightAll();
  }, [message.content, isOpen]);

  // ✅ Detect if content is an image URL
  const isImageUrl = (url) =>
    typeof url === "string" &&
    /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(url);

  return (
    <div>
      {message.role === "user" ? (
        // USER MESSAGE
        <div className="flex items-start justify-end my-4 gap-2">
          <div
            onClick={() => setIsOpen(!isOpen)}
            className="flex flex-col gap-2 p-2 px-4 bg-slate-50 dark:bg-[#57317C]/30 border border-[#80609F]/30 rounded-md max-w-2xl cursor-pointer"
          >
            {isOpen ? (
              <p className="text-sm dark:text-primary">{message.content}</p>
            ) : (
              <p className="text-sm dark:text-primary line-clamp-2">
                {message.content}
              </p>
            )}
            {isOpen && (
              <span className="text-xs text-gray-400 dark:text-[#B1A6C0]">
                {moment(message.timestamp).fromNow()}
              </span>
            )}
          </div>
          <img src={assets.user_icon} alt="user" className="w-8 rounded-full" />
        </div>
      ) : (
        // ASSISTANT MESSAGE
        <div className="inline-flex flex-col gap-2 p-2 px-4 max-w-2xl bg-primary/20 dark:bg-[#57317c]/30 border border-[#80609F]/30 rounded-md my-4">
          {isImageUrl(message.content) ? (
            // ✅ Always show image
            <img
              src={message.content}
              alt="assistant response"
              className="w-full max-w-md mt-2 rounded-md"
            />
          ) : (
            // ✅ Text is still toggleable
            <div
              onClick={() => setIsOpen(!isOpen)}
              className="text-sm dark:text-primary rest-tw cursor-pointer"
            >
              {isOpen ? (
                <Markdown>{message.content}</Markdown>
              ) : (
                <p className="line-clamp-2">{message.content}</p>
              )}
            </div>
          )}
          <span className="text-xs text-gray-400 dark:text-[#B1A6C0]">
            {moment(message.timestamp).fromNow()}
          </span>
        </div>
      )}
    </div>
  );
};

export default Message;
