import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addCategory, setFilterCategory } from "../store/notesSlice";

const Sidebar = ({ darkMode }) => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.notes.categories);
  const filterCategory = useSelector((state) => state.notes.filterCategory);

  const [newCategory, setNewCategory] = useState("");

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      dispatch(addCategory(newCategory));
      setNewCategory("");
    }
  };

  return (
    <div className="w-60 bg-gray-200 dark:bg-gray-800 p-4 text-gray-900 dark:text-gray-100 flex-shrink-0">
      <h2 className="text-lg font-bold mb-4">Categories</h2>

      <ul className="mb-4">
        <li
          className={`cursor-pointer p-2 rounded ${
            filterCategory === "All"
              ? "bg-gray-300 dark:bg-gray-700 font-semibold"
              : "hover:bg-gray-300 dark:hover:bg-gray-700"
          }`}
          onClick={() => dispatch(setFilterCategory("All"))}
        >
          All
        </li>

        {categories.map((cat) => (
          <li
            key={cat}
            className={`cursor-pointer p-2 rounded ${
              filterCategory === cat
                ? "bg-gray-300 dark:bg-gray-700 font-semibold"
                : "hover:bg-gray-300 dark:hover:bg-gray-700"
            }`}
            onClick={() => dispatch(setFilterCategory(cat))}
          >
            {cat}
          </li>
        ))}
      </ul>

      <div className="flex gap-2">
        <input
          type="text"
          placeholder="New category"
          className="flex-1 border rounded px-2 py-1 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <button
          onClick={handleAddCategory}
          className="px-3 py-1 bg-blue-500 text-white rounded dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-500 transition-colors"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
