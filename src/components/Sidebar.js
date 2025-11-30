import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setFilterCategory } from "../store/notesSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.notes.categories);
  const [newCategory, setNewCategory] = useState("");

  const handleAddCategory = () => {
    if (newCategory.trim() !== "") {
      dispatch({ type: "notes/addCategory", payload: newCategory.trim() });
      setNewCategory("");
    }
  };

  return (
    <div className="w-64 p-4 border-r border-gray-300">
      <h2 className="text-xl font-bold mb-4">Categories</h2>

      <button
        className="mb-2 px-3 py-1 bg-gray-200 rounded"
        onClick={() => dispatch(setFilterCategory("All"))}
      >
        All Notes
      </button>

      <div className="flex flex-col space-y-1">
        {categories.map((cat) => (
          <button
            key={cat}
            className="px-3 py-1 bg-gray-100 rounded text-left"
            onClick={() => dispatch(setFilterCategory(cat))}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="mt-4">
        <input
          type="text"
          className="border rounded px-2 py-1 w-full"
          placeholder="New category"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <button
          className="mt-1 w-full bg-blue-500 text-white py-1 rounded"
          onClick={handleAddCategory}
        >
          Add Category
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
