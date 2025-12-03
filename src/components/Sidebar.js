import { useDispatch, useSelector } from "react-redux";
import {
  setFilterCategory,
  addCategory,
  editCategory,
  deleteCategory,
} from "../store/notesSlice";
import { useState } from "react";

const Sidebar = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.notes.categories);
  const active = useSelector((state) => state.notes.filterCategory);

  const [newCat, setNewCat] = useState("");
  const [editing, setEditing] = useState(null);
  const [editValue, setEditValue] = useState("");

  const handleAdd = () => {
    if (newCat.trim()) {
      dispatch(addCategory(newCat.trim()));
      setNewCat("");
    }
  };

  return (
    <div className="w-60 p-4 border-r dark:bg-gray-900">
      <h2 className="font-bold mb-3">Categories</h2>

      <button
        onClick={() => dispatch(setFilterCategory("All"))}
        className={`block mb-2 ${active === "All" ? "font-bold" : ""}`}
      >
        All
      </button>

      {categories.map((cat) => (
        <div key={cat} className="flex items-center justify-between mb-1">
          {editing === cat ? (
            <>
              <input
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                className="border px-1 text-sm"
              />
              <button
                onClick={() => {
                  dispatch(
                    editCategory({ oldName: cat, newName: editValue })
                  );
                  setEditing(null);
                }}
                className="text-xs text-green-500"
              >
                ✅
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => dispatch(setFilterCategory(cat))}
                className={`text-left flex-1 ${
                  active === cat ? "font-bold" : ""
                }`}
              >
                {cat}
              </button>

              <button
                onClick={() => {
                  setEditing(cat);
                  setEditValue(cat);
                }}
                className="text-xs text-blue-500 mx-1"
              >
                ✏️
              </button>

              <button
                onClick={() => dispatch(deleteCategory(cat))}
                className="text-xs text-red-500"
              >
                🗑️
              </button>
            </>
          )}
        </div>
      ))}

      <div className="mt-3">
        <input
          value={newCat}
          onChange={(e) => setNewCat(e.target.value)}
          placeholder="New category"
          className="border px-2 py-1 w-full text-sm"
        />
        <button
          onClick={handleAdd}
          className="w-full mt-1 bg-green-500 text-white text-sm py-1"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
