import React from "react";

const Navbar = ({ username, onLogout }) => {
  return (
    <div className="w-full flex justify-between items-center p-4 bg-gray-100 border-b border-gray-300">
      <div className="font-bold text-xl">Notes App</div>
      <div className="flex items-center space-x-4">
        <span>{username}</span>
        <button
          onClick={onLogout}
          className="px-3 py-1 bg-red-500 text-white rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
