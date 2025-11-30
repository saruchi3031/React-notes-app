import React from "react";
import { useDispatch } from "react-redux";
import { deleteNote, toggleStar } from "../store/notesSlice";

const NoteCard = ({ note }) => {
  const dispatch = useDispatch();

  return (
    <div className="border rounded p-3 flex flex-col justify-between bg-white shadow">
      <div>
        <h3 className="font-semibold text-lg">
          {note.title} {note.starred && <span className="text-yellow-500">★</span>}
        </h3>
        <p className="text-sm text-gray-600">{note.description}</p>
        <p className="text-xs text-gray-400 mt-1">
          Category: {note.category} • {new Date(note.createdAt).toLocaleString()}
        </p>
      </div>

      <div className="flex justify-end mt-2 space-x-2">
        <button
          className="px-2 py-1 border rounded"
          onClick={() => dispatch(toggleStar(note.id))}
        >
          {note.starred ? "Unstar" : "Star"}
        </button>
        <button
          className="px-2 py-1 bg-red-500 text-white rounded"
          onClick={() => dispatch(deleteNote(note.id))}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default NoteCard;
