import React from "react";

const Navbar = ({ username, onLogout, darkMode, setDarkMode }) => {
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 shadow-md">
      
      {/* Left: App title */}
      <h1 className="text-xl font-bold">Notes App</h1>

      {/* Right: User actions */}
      <div className="flex items-center gap-4">
        
        {/* Dark mode toggle */}
        <button
          className="px-3 py-1 border rounded hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>

        {/* Username */}
        <span className="font-medium">{username}</span>

        {/* Logout */}
        <button
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 dark:hover:bg-red-600 transition-colors"
          onClick={onLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
