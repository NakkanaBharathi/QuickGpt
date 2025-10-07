import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar.jsx";
import Chatbox from "./components/Chatbox.jsx";
import Credits from "./pages/Credits.jsx";
import Community from "./pages/Community.jsx";
import Login from "./pages/Login.jsx";
import assets from "./assets/assets";
import Loading from "./pages/Loading.jsx";
import { useAppContext } from "./context/AppContext"; // adjust path
import "./assets/prism.css";

const App = () => {
  const { user } = useAppContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { pathname } = useLocation();

  if (pathname === "/loading") return <Loading />;

  return (
    <>
      {/* Hamburger menu button (mobile only) */}
      {!isMenuOpen && user && (
        <img
          src={assets.menu_icon}
          className="absolute top-3 left-3 w-8 h-8 cursor-pointer md:hidden not-dark:invert z-20"
          onClick={() => setIsMenuOpen(true)}
          alt="menu"
        />
      )}

      {user ? (
        <div className="dark:bg-gradient-to-b from-[#242124] to-[#000000] dark:text-white min-h-screen">
          <div className="flex h-screen w-screen">
            {/* Sidebar */}
            <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

            {/* Main content */}
            <main className="flex-1 overflow-hidden">
              <Routes>
                <Route path="/" element={<Chatbox />} />
                <Route path="/credits" element={<Credits />} />
                <Route path="/community" element={<Community />} />
              </Routes>
            </main>
          </div>
        </div>
      ) : (
        <div className="bg-gradient-to-b from-[#242124] to-[#000000] flex items-center justify-center min-h-screen w-screen">
          <Login />
        </div>
      )}
    </>
  );
};

export default App;
