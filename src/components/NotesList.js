import React from "react";
import { useDispatch } from "react-redux";
import { deleteNote, toggleStar } from "../store/notesSlice";

const NotesList = ({ notes, onEdit }) => {
  const dispatch = useDispatch();

  if (!notes.length) {
    return (
      <div className="p-4 text-gray-500 text-center">
        No notes found…
      </div>
    );
  }

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {notes.map((note) => (
        <div
          key={note.id}
          className="border rounded p-4 shadow-sm bg-white relative"
        >
          {/* Star Toggle */}
          <button
            className="absolute top-2 right-2 text-yellow-500 text-xl"
            onClick={() => dispatch(toggleStar(note.id))}
          >
            {note.starred ? "★" : "☆"}
          </button>

          <h2 className="text-lg font-bold">{note.title}</h2>

          <p className="text-sm text-gray-600 mb-3">
            {note.description}
          </p>

          <p className="text-xs text-gray-400 mb-2">
            Category: <span className="font-medium">{note.category}</span>
          </p>

          <p className="text-xs text-gray-400">
            Created: {new Date(note.createdAt).toLocaleString()}
          </p>

          {/* Actions */}
          <div className="flex justify-between mt-4">
            <button
              className="text-blue-500 underline text-sm"
              onClick={() => onEdit(note)}
            >
              Edit
            </button>

            <button
              className="text-red-500 underline text-sm"
              onClick={() => dispatch(deleteNote(note.id))}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotesList;
