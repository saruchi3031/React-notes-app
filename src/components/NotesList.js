import React from "react";
import NoteCard from "./NoteCard";

const NotesList = ({ notes }) => {
  if (notes.length === 0) return <p className="p-4">No notes to show.</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} />
      ))}
    </div>
  );
};

export default NotesList;
