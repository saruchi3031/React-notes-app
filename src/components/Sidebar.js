import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCategory, setFilterCategory } from "../store/notesSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.notes.categories);
  const [newCategory, setNewCategory] = useState("");
  const [open, setOpen] = useState(false); // ✅ mobile toggle state

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      dispatch(addCategory(newCategory));
      setNewCategory("");
    }
  };

  return (
    <>
      {/* ✅ MOBILE TOGGLE BUTTON */}
      <button
        className="md:hidden fixed top-3 left-3 z-50 bg-gray-800 text-white px-3 py-1 rounded"
        onClick={() => setOpen(!open)}
      >
        ☰
      </button>

      {/* ✅ SIDEBAR */}
      <div
        className={`fixed md:static top-0 left-0 h-full w-64 bg-gray-100 dark:bg-gray-900 p-4 border-r z-40 transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <h2 className="text-lg font-bold mb-4">Categories</h2>

        {/* ✅ Add Category */}
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="New Category"
            className="border px-2 py-1 rounded w-full"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
          <button
            onClick={handleAddCategory}
            className="bg-blue-500 text-white px-3 rounded"
          >
            +
          </button>
        </div>

        {/* ✅ Category List */}
        <ul className="space-y-2">
          <li
            className="cursor-pointer hover:text-blue-500"
            onClick={() => dispatch(setFilterCategory("All"))}
          >
            All
          </li>
          {categories.map((cat) => (
            <li
              key={cat}
              className="cursor-pointer hover:text-blue-500"
              onClick={() => dispatch(setFilterCategory(cat))}
            >
              {cat}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
