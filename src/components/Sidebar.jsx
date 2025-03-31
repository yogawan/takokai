import React, { useState } from "react";
import Link from "next/link";

const Sidebar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const ChatHistory = [
    { label: "yogawan", path: "/", icon: "" },
    { label: "lootzelui", path: "/", icon: "" },
    { label: "mikodian", path: "/", icon: "" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 w-full bg-transparent backdrop-blur border-b border-white/10 z-50">
      
      <div className="w-full px-4 py-4 flex items-center justify-between">
        <div className="flex justify-between items-center">
          <button
            className="relative w-10 h-10 flex items-center justify-center focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            <div className="relative w-6 h-5 flex flex-col justify-between">
              <span
                className={`block h-0.5 bg-white rounded transition-transform duration-300 ${
                  isMenuOpen ? "rotate-45 translate-y-2.5" : ""
                }`}
              ></span>
              <span
                className={`block h-0.5 bg-white rounded transition-all duration-300 ${
                  isMenuOpen ? "opacity-0" : "opacity-100"
                }`}
              ></span>
              <span
                className={`block h-0.5 bg-white rounded transition-transform duration-300 ${
                  isMenuOpen ? "-rotate-45 -translate-y-2.5" : ""
                }`}
              ></span>
            </div>
          </button>
        </div>
        <p className="text-white text-xs px-3 py-3 border border-white/15 rounded-full">JawirAI v2.6.3</p>
      </div>

      <div
        className={`fixed left-0 top-0 bottom-0 h-screen w-screen pb-60 pt-10 pl-10 bg-black dark:bg-black flex flex-col items-start justify-start z-50 transform overflow-auto ${
          isMenuOpen
            ? "opacity-100 translate-x-0 scale-100"
            : "opacity-0 -translate-x-full scale-95"
        } transition-all duration-500 ease-in-out`}
        style={{ pointerEvents: isMenuOpen ? "auto" : "none" }}
      >
        <button
          className="absolute top-4 left-4 flex items-center justify-center w-10 h-10 focus:outline-none"
          onClick={toggleMenu}
          aria-label="Close Menu"
        >
          <div className="relative w-6 h-5">
            <span className="absolute top-0 left-0 block w-6 h-0.5 bg-white rounded transform rotate-45"></span>
            <span className="absolute top-0 left-0 block w-6 h-0.5 bg-white rounded transform -rotate-45"></span>
          </div>
        </button>
        <ul className="space-y-[-12px] text-start">
          <p className="text-3xl text-white m-3">Our Team</p>
          {ChatHistory.map((item, index) => (
            <li
              key={index}
              className="flex justify-start items-start text-white dark:text-white transition duration-500"
            >
              <Link
                href={item.path}
                className="font-inter m-3 text-xl font-thin transition-transform transform hover:scale-110"
                onClick={toggleMenu}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;