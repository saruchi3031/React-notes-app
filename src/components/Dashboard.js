import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Sidebar from "./Sidebar";
import NotesList from "./NotesList";
import Navbar from "./Navbar";
import {
  addNote,
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

  // Load notes on mount
  useEffect(() => {
    dispatch(loadFromLocalStorage());
  }, [dispatch]);

  const handleAddNote = () => {
    if (title.trim() && description.trim()) {
      dispatch(addNote({ title, description, category }));
      setTitle("");
      setDescription("");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar username={username} onLogout={handleLogout} />

        {/* Add + Search section */}
        <div className="p-4 border-b border-gray-300 space-y-2 md:space-y-0 md:flex md:items-center md:justify-between">
          {/* Left: Add Note Form */}
          <div className="flex flex-wrap items-center gap-2">
            <input
              type="text"
              placeholder="Title"
              className="border rounded px-2 py-1"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="text"
              placeholder="Description"
              className="border rounded px-2 py-1"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <select
              className="border rounded px-2 py-1"
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
              className="px-3 py-1 bg-green-500 text-white rounded"
            >
              Add Note
            </button>
          </div>

          {/* Right: Search + Starred Filter */}
          <div className="flex items-center gap-2 mt-2 md:mt-0">
            <input
              type="text"
              placeholder="Search notes..."
              className="border rounded px-2 py-1"
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

        {/* NOTES LIST */}
        <div className="flex-1 overflow-auto p-4">
          <NotesList notes={notes} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

