// src/components/NotesTest.js
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addNote, deleteNote, toggleStar } from "../store/notesSlice";

const NotesTest = () => {
  const notes = useSelector((state) => state.notes);
  const dispatch = useDispatch();

  const handleAdd = () => {
    dispatch(
      addNote({
        title: "Sample Note",
        description: "This is a test note",
        category: "Test",
      })
    );
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">NotesTest Page</h1>

      <button
        onClick={handleAdd}
        className="mb-4 bg-green-500 text-white px-4 py-2 rounded"
      >
        Add Test Note
      </button>

      {notes.length === 0 && <p>No notes yet.</p>}

      <div className="space-y-3">
        {notes.map((note) => (
          <div
            key={note.id}
            className="border rounded p-3 flex justify-between items-center"
          >
            <div>
              <h3 className="font-semibold">
                {note.title}{" "}
                {note.starred && <span className="text-yellow-500">★</span>}
              </h3>
              <p className="text-sm text-gray-600">{note.description}</p>
              <p className="text-xs text-gray-400">
                Category: {note.category} •{" "}
                {new Date(note.createdAt).toLocaleString()}
              </p>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => dispatch(toggleStar(note.id))}
                className="px-2 py-1 text-sm border rounded"
              >
                {note.starred ? "Unstar" : "Star"}
              </button>
              <button
                onClick={() => dispatch(deleteNote(note.id))}
                className="px-2 py-1 text-sm bg-red-500 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotesTest;
