import React from "react";
import { useDispatch } from "react-redux";
import { deleteNote, toggleStar } from "../store/notesSlice";

const NotesList = ({ notes, onEdit }) => {
  const dispatch = useDispatch();

  if (!notes.length) {
    return (
      <div className="p-4 text-gray-500 dark:text-gray-400 text-center">
        No notes found…
      </div>
    );
  }

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {notes.map((note) => (
        <div
          key={note.id}
          className="border rounded p-4 shadow-sm bg-white dark:bg-gray-800 dark:text-gray-200 relative transition-colors duration-300"
        >
          {/* Star Toggle */}
          <button
            className="absolute top-2 right-2 text-yellow-500 dark:text-amber-400 text-xl"
            onClick={() => dispatch(toggleStar(note.id))}
          >
            {note.starred ? "★" : "☆"}
          </button>

          {/* Note Title */}
          <h2 className="text-lg font-bold">{note.title}</h2>

          {/* Description */}
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
            {note.description}
          </p>

          {/* Category */}
          <p className="text-xs text-gray-400 dark:text-gray-400 mb-2">
            Category: <span className="font-medium">{note.category}</span>
          </p>

          {/* Created At */}
          <p className="text-xs text-gray-400 dark:text-gray-400">
            Created: {new Date(note.createdAt).toLocaleString()}
          </p>

          {/* Actions */}
          <div className="flex justify-between mt-4">
            <button
              className="text-blue-500 dark:text-blue-400 underline text-sm hover:text-blue-600 dark:hover:text-blue-300 transition-colors"
              onClick={() => onEdit(note)}
            >
              Edit
            </button>

            <button
              className="text-red-500 dark:text-red-400 underline text-sm hover:text-red-600 dark:hover:text-red-500 transition-colors"
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
