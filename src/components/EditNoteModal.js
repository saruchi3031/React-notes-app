import React, { useState, useEffect } from "react";

const EditNoteModal = ({ note, categories, onClose, onSave }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setDescription(note.description);
      setCategory(note.category);
    }
  }, [note]);

  if (!note) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
      <div className="bg-white p-5 rounded shadow-lg w-96">
        <h2 className="text-lg font-bold mb-3">Edit Note</h2>

        <input
          className="border w-full mb-2 p-2 rounded"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          className="border w-full mb-2 p-2 rounded"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <select
          className="border w-full mb-3 p-2 rounded"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>

        <div className="flex justify-end gap-2">
          <button
            className="px-3 py-1 border rounded"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="px-3 py-1 bg-blue-600 text-white rounded"
            onClick={() =>
              onSave({
                id: note.id,
                title,
                description,
                category,
              })
            }
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditNoteModal;
