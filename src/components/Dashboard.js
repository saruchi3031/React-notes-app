import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Sidebar from "./Sidebar";
import NotesList from "./NotesList";
import Navbar from "./Navbar";
import { addNote, loadFromLocalStorage } from "../store/notesSlice";
import { selectFilteredNotes } from "../store/notesSlice";
const Dashboard = () => {
  const dispatch = useDispatch();
  const notes = useSelector(selectFilteredNotes);
const categories = useSelector((state) => state.notes.categories);
  const username = JSON.parse(localStorage.getItem("user"))?.username || "User";

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("All");

  // Load from LocalStorage on first render
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
      <div className="flex-1 flex flex-col">
        <Navbar username={username} onLogout={handleLogout} />

        {/* Add Note Form */}
        <div className="p-4 border-b border-gray-300">
          <input
            type="text"
            placeholder="Title"
            className="border rounded px-2 py-1 mr-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Description"
            className="border rounded px-2 py-1 mr-2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <select
  className="border rounded px-2 py-1 mr-2"
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

        <NotesList notes={notes} />
      </div>
    </div>
  );
};

export default Dashboard;
