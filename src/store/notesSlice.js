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
      saveToLocalStorage(state);
    },

    deleteNote: (state, action) => {
      state.notes = state.notes.filter((note) => note.id !== action.payload);
      saveToLocalStorage(state);
    },

    toggleStar: (state, action) => {
      const note = state.notes.find((n) => n.id === action.payload);
      if (note) note.starred = !note.starred;
      saveToLocalStorage(state);
    },

    editNote: (state, action) => {
      const { id, title, description, category } = action.payload;
      const note = state.notes.find((n) => n.id === id);
      if (note) {
        note.title = title;
        note.description = description;
        note.category = category;
      }
      saveToLocalStorage(state);
    },

    addCategory: (state, action) => {
      const name = action.payload;
      if (name && !state.categories.includes(name)) state.categories.push(name);
      saveToLocalStorage(state);
    },

    setFilterCategory: (state, action) => {
      state.filterCategory = action.payload;
      saveToLocalStorage(state);
    },

    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },

    setShowStarredOnly: (state, action) => {
      state.showStarredOnly = action.payload;
    },

    loadFromLocalStorage: (state) => {
      const savedState = JSON.parse(localStorage.getItem("notesState"));
      if (savedState) {
        state.notes = savedState.notes || [];
        state.categories = savedState.categories || [];
        state.filterCategory = savedState.filterCategory || "All";
        state.searchQuery = savedState.searchQuery || "";
        state.showStarredOnly = savedState.showStarredOnly || false;
      }
    },
  },
});

// Helper function to save entire state to LocalStorage
const saveToLocalStorage = (state) => {
  localStorage.setItem("notesState", JSON.stringify(state));
};

export const {
  addNote,
  deleteNote,
  toggleStar,
  editNote,
  addCategory,
  setFilterCategory,
  setSearchQuery,
  setShowStarredOnly,
  loadFromLocalStorage,
} = notesSlice.actions;

// Selector for filtered notes
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

  // Search filter
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