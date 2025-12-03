import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Sidebar from "./Sidebar";
import NotesList from "./NotesList";
import Navbar from "./Navbar";
import EditNoteModal from "./EditNoteModal";
import {
  addNote,
  editNote,
  loadFromLocalStorage,
  selectFilteredNotes,
  setSearchQuery,
  setShowStarredOnly,
} from "../store/notesSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const notes = useSelector(selectFilteredNotes);
  const categories = useSelector((state) => state.notes.categories);
  const searchQuery = useSelector((state) => state.notes.searchQuery);
  const showStarredOnly = useSelector(
    (state) => state.notes.showStarredOnly
  );

  const username =
    JSON.parse(localStorage.getItem("user"))?.username || "User";

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("All");
  const [editingNote, setEditingNote] = useState(null);

  // Dark Mode state
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  useEffect(() => {
    // Load notes + categories from LocalStorage
    dispatch(loadFromLocalStorage());
  }, [dispatch]);

  useEffect(() => {
    // Apply dark mode class to <html>
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const handleAddNote = () => {
    if (title.trim() && description.trim()) {
      dispatch(addNote({ title, description, category }));
      setTitle("");
      setDescription("");
      setCategory("All");
    }
  };

  const handleSaveEdit = (updatedNote) => {
    dispatch(editNote(updatedNote));
    setEditingNote(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Sidebar darkMode={darkMode} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar
          username={username}
          onLogout={handleLogout}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

        {/* Add + Search Section */}
        <div className="p-4 border-b border-gray-300 dark:border-gray-700 space-y-2 md:space-y-0 md:flex md:items-center md:justify-between">
          {/* Left: Add Note Form */}
          <div className="flex flex-wrap items-center gap-2">
            <input
              type="text"
              placeholder="Title"
              className="border rounded px-2 py-1 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="text"
              placeholder="Description"
              className="border rounded px-2 py-1 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <select
              className="border rounded px-2 py-1 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="All">All</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <button
              onClick={handleAddNote}
              className="px-3 py-1 bg-green-500 text-white rounded dark:bg-green-600 hover:bg-green-600 dark:hover:bg-green-500 transition-colors"
            >
              Add Note
            </button>
          </div>

          {/* Right: Search + Starred Filter */}
          <div className="flex items-center gap-2 mt-2 md:mt-0">
            <input
              type="text"
              placeholder="Search notes..."
              className="border rounded px-2 py-1 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
              value={searchQuery}
              onChange={(e) => dispatch(setSearchQuery(e.target.value))}
            />

            <label className="flex items-center text-sm">
              <input
                type="checkbox"
                className="mr-1"
                checked={showStarredOnly}
                onChange={(e) =>
                  dispatch(setShowStarredOnly(e.target.checked))
                }
              />
              Starred only
            </label>
          </div>
        </div>

        {/* Notes List */}
        <div className="flex-1 overflow-auto p-4">
          <NotesList notes={notes} onEdit={(note) => setEditingNote(note)} />
        </div>
      </div>

      {/* Edit Note Modal */}
      {editingNote && (
        <EditNoteModal
          note={editingNote}
          categories={categories}
          onClose={() => setEditingNote(null)}
          onSave={handleSaveEdit}
        />
      )}
    </div>
  );
};

export default Dashboard;
