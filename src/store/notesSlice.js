// src/store/notesSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notes: [],
  categories: [],
  filterCategory: "All",
  searchQuery: "",
  showStarredOnly: false,
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
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setShowStarredOnly: (state, action) => {
      state.showStarredOnly = action.payload;
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
  setSearchQuery,
  setShowStarredOnly,
} = notesSlice.actions;

// selector for filtered notes
export const selectFilteredNotes = (state) => {
  const { notes, filterCategory, searchQuery, showStarredOnly } = state.notes;

  let filtered = notes;

  // Category filter
  if (filterCategory !== "All") {
    filtered = filtered.filter((n) => n.category === filterCategory);
  }

  // Starred-only filter
  if (showStarredOnly) {
    filtered = filtered.filter((n) => n.starred);
  }

  // Search filter (title + description)
  if (searchQuery.trim() !== "") {
    const q = searchQuery.toLowerCase();
    filtered = filtered.filter(
      (n) =>
        n.title.toLowerCase().includes(q) ||
        n.description.toLowerCase().includes(q)
    );
  }

  return filtered;
};

export default notesSlice.reducer;
