import { createSlice } from "@reduxjs/toolkit";

// Load notes from LocalStorage
const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];

const notesSlice = createSlice({
  name: "notes",
  initialState: savedNotes,
  reducers: {
    addNote: (state, action) => {
      state.push({
        id: Date.now(),
        title: action.payload.title,
        description: action.payload.description,
        category: action.payload.category || "General",
        starred: false,
        createdAt: new Date().toISOString(),
      });
      localStorage.setItem("notes", JSON.stringify(state));
    },
    editNote: (state, action) => {
      const index = state.findIndex((note) => note.id === action.payload.id);
      if (index !== -1) {
        state[index] = { ...state[index], ...action.payload };
        localStorage.setItem("notes", JSON.stringify(state));
      }
    },
    deleteNote: (state, action) => {
      const newState = state.filter((note) => note.id !== action.payload);
      localStorage.setItem("notes", JSON.stringify(newState));
      return newState;
    },
    toggleStar: (state, action) => {
      const note = state.find((note) => note.id === action.payload);
      if (note) {
        note.starred = !note.starred;
        localStorage.setItem("notes", JSON.stringify(state));
      }
    },
  },
});

export const { addNote, editNote, deleteNote, toggleStar } = notesSlice.actions;
export default notesSlice.reducer;
