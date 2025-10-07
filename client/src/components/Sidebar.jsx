import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import assets from "../assets/assets";
import moment from "moment";

const Sidebar = ({ isMenuOpen, setIsMenuOpen }) => {
  const { chats, setSelectedChat, theme, setTheme, user, navigate } =
    useAppContext();
  const [search, setSearch] = useState("");

  // Filter chats by search or message content
  const filteredChats = chats.filter(
    (chat) =>
      chat.messages[0]?.content.toLowerCase().includes(search.toLowerCase()) ||
      chat.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      className={`flex flex-col h-screen min-w-72 p-5
        bg-white text-black dark:bg-gray-900 dark:text-white
        border-r border-gray-300 dark:border-gray-700
        transition-all duration-500 max-md:absolute left-0 z-10
        ${isMenuOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
    >
      {/* Logo */}
      <img
        src={assets.logo_full_dark}
        alt="Logo"
        className="w-full max-w-48 dark:invert"
      />

      {/* New chat button */}
      <button
        className="flex justify-center items-center w-full py-2 mt-10
        text-white bg-gradient-to-r from-[#A456F7] to-[#3D81F6]
        text-sm rounded-md cursor-pointer"
      >
        <span className="mr-2 text-xl">+</span>New Chat
      </button>

      {/* Search bar */}
      <div className="flex items-center gap-2 p-3 mt-4 border border-gray-400 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800">
        <img src={assets.search_icon} className="w-4 not-dark:invert" alt="search" />
        <input
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          type="text"
          placeholder="Search conversations"
          className="text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 outline-none bg-transparent flex-1"
        />
      </div>

      {/* Recent chats */}
      {filteredChats.length > 0 && (
        <p className="mt-4 text-sm font-medium">Recent Chats</p>
      )}

      <div className="mt-2 space-y-2 overflow-y-auto flex-1">
        {filteredChats.map((chat) => (
          <div onClickCapture={()=>{navigate('/');setSelectedChat(chat);setIsMenuOpen(false)}}
            key={chat._id}
            onClick={() => setSelectedChat(chat)}
            className="p-2 px-4 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700
              rounded-md cursor-pointer flex justify-between items-center
              group hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            <div className="overflow-hidden">
              <p className="truncate w-full">
                {chat.messages.length > 0
                  ? chat.messages[0].content.slice(0, 32)
                  : chat.name}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {moment(chat.updatedAt).fromNow()}
              </p>
            </div>
            <img
              src={assets.bin_icon}
              className="hidden group-hover:block w-4 cursor-pointer not-dark:invert"
              alt="delete"
            />
          </div>
        ))}
        {filteredChats.length === 0 && (
          <p className="text-gray-400 dark:text-gray-500 text-sm">No chats found</p>
        )}
      </div>

      {/* Community images */}
      <div
        onClick={() => {
          navigate("/community"); setIsMenuOpen(false)
        }}
        className="flex items-center gap-2 p-3 mt-4 border border-gray-300 dark:border-gray-700
        rounded-md cursor-pointer hover:scale-103 transition-all"
      >
        <img src={assets.gallery_icon} className="w-4.5 not-dark:invert" alt="community" />
        <div className="flex flex-col text-sm">
          <p>Community Images</p>
        </div>
      </div>

      {/* Purchase credits */}
      <div
        onClick={() => {
          navigate("/credits");setIsMenuOpen(false)
        }}
        className="flex items-center gap-2 p-3 mt-4 border border-gray-300 dark:border-gray-700
        rounded-md cursor-pointer hover:scale-103 transition-all"
      >
        <img src={assets.diamond_icon} className="w-4.5 dark:invert" alt="credits" />
        <div className="flex flex-col text-sm">
          <p>Credits: {user?.credits}</p>
          <p className="text-xs text-gray-400 dark:text-gray-500">
            Purchase credits to use QuickGPT
          </p>
        </div>
      </div>

      {/* Dark mode Toggle */}
      <div
        className="flex items-center justify-between gap-2 p-3 mt-4 border border-gray-300
        dark:border-gray-700 rounded-md"
      >
        <div className="flex items-center gap-2 text-sm">
          <img src={assets.theme_icon} className="w-4 not-dark:invert" alt="theme" />
          <p>Dark Mode</p>
        </div>

        <label className="relative inline-flex cursor-pointer items-center">
          <input
            onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
            type="checkbox"
            className="sr-only peer"
            checked={theme === "dark"}
          />
          <div className="relative w-9 h-5 bg-gray-400 rounded-full peer-checked:bg-purple-600 transition-colors">
            <span className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-4"></span>
          </div>
        </label>
      </div>

      {/* User Account */}
      <div
        onClick={() => {
          navigate("/community");
        }}
        className="flex items-center gap-3 p-3 mt-4 border border-gray-300 dark:border-gray-700 
        rounded-md cursor-pointer group bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
      >
        <img src={assets.user_icon} className="w-6 h-6 dark:not-invert" alt="user" />

        <div className="flex flex-col flex-1 text-sm truncate">
          <p className="font-medium">{user ? user.name : "Login to your account"}</p>
          {user && <p className="text-xs text-gray-500 dark:text-gray-400">View profile</p>}
        </div>

        {user && (
          <img
            src={assets.logout_icon}
            className="h-5 cursor-pointer hidden not-dark:invert group-hover:block"
            alt="logout"
            onClick={() => console.log("Logout clicked")}
          />
        )}
      </div>

      {/* Close button for mobile */}
      <img
        onClick={() => setIsMenuOpen(false)}
        src={assets.close_icon}
        className="absolute top-3 right-3 w-5 h-5 cursor-pointer md not-dark:invert"
        alt="close"
      />
    </div>
  );
};

export default Sidebar;
