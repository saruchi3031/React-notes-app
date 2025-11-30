// src/store/notesSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notes: [],
  categories: [],
  filterCategory: "All",
};

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addNote: (state, action) => {
      const newNote = {
        id: Date.now(),
        title: action.payload.title,
        description: action.payload.description,
        category: action.payload.category,
        starred: false,
        createdAt: Date.now(),
      };
      state.notes.push(newNote);
      // persist
      localStorage.setItem("notes", JSON.stringify(state.notes));
    },
    deleteNote: (state, action) => {
      state.notes = state.notes.filter((note) => note.id !== action.payload);
      localStorage.setItem("notes", JSON.stringify(state.notes));
    },
    toggleStar: (state, action) => {
      const note = state.notes.find((n) => n.id === action.payload);
      if (note) {
        note.starred = !note.starred;
        localStorage.setItem("notes", JSON.stringify(state.notes));
      }
    },
    addCategory: (state, action) => {
      const name = action.payload;
      if (name && !state.categories.includes(name)) {
        state.categories.push(name);
        localStorage.setItem("categories", JSON.stringify(state.categories));
      }
    },
    setFilterCategory: (state, action) => {
      state.filterCategory = action.payload;
    },
    loadFromLocalStorage: (state) => {
      const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
      const savedCategories =
        JSON.parse(localStorage.getItem("categories")) || [];
      state.notes = savedNotes;
      state.categories = savedCategories;
    },
  },
});

export const {
  addNote,
  deleteNote,
  toggleStar,
  addCategory,
  setFilterCategory,
  loadFromLocalStorage,
} = notesSlice.actions;

// selector for filtered notes
export const selectFilteredNotes = (state) => {
  const { notes, filterCategory } = state.notes;
  if (filterCategory === "All") return notes;
  return notes.filter((n) => n.category === filterCategory);
};

export default notesSlice.reducer;
