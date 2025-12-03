import React, { useState } from "react";

const EditNoteModal = ({ note, categories, onClose, onSave }) => {
  const [title, setTitle] = useState(note.title);
  const [description, setDescription] = useState(note.description);
  const [category, setCategory] = useState(note.category);

  const handleSave = () => {
    onSave({ ...note, title, description, category });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 dark:text-gray-200 rounded shadow-lg w-96 p-4">
        <h2 className="text-lg font-bold mb-4">Edit Note</h2>

        <input
          type="text"
          placeholder="Title"
          className="w-full border rounded px-2 py-1 mb-2 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          className="w-full border rounded px-2 py-1 mb-2 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <select
          className="w-full border rounded px-2 py-1 mb-4 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-3 py-1 border rounded dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-3 py-1 bg-green-500 text-white rounded dark:bg-green-600 hover:bg-green-600 dark:hover:bg-green-500 transition-colors"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditNoteModal;
