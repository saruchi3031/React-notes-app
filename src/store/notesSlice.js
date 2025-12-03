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
    // ✅ ADD NOTE
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
      localStorage.setItem("notes", JSON.stringify(state.notes));
    },

    // ✅ DELETE NOTE
    deleteNote: (state, action) => {
      state.notes = state.notes.filter((note) => note.id !== action.payload);
      localStorage.setItem("notes", JSON.stringify(state.notes));
    },

    // ✅ TOGGLE STAR
    toggleStar: (state, action) => {
      const note = state.notes.find((n) => n.id === action.payload);
      if (note) {
        note.starred = !note.starred;
        localStorage.setItem("notes", JSON.stringify(state.notes));
      }
    },

    // ✅ EDIT NOTE
    editNote: (state, action) => {
      const { id, title, description, category } = action.payload;
      const note = state.notes.find((n) => n.id === id);
      if (note) {
        note.title = title;
        note.description = description;
        note.category = category;
        localStorage.setItem("notes", JSON.stringify(state.notes));
      }
    },

    // ✅ ADD CATEGORY
    addCategory: (state, action) => {
      const name = action.payload;
      if (name && !state.categories.includes(name)) {
        state.categories.push(name);
        localStorage.setItem("categories", JSON.stringify(state.categories));
      }
    },

    // ✅ EDIT CATEGORY
    editCategory: (state, action) => {
      const { oldName, newName } = action.payload;

      const index = state.categories.indexOf(oldName);
      if (index !== -1 && newName.trim()) {
        state.categories[index] = newName;

        // ✅ Update notes using old category
        state.notes.forEach((note) => {
          if (note.category === oldName) {
            note.category = newName;
          }
        });

        localStorage.setItem("categories", JSON.stringify(state.categories));
        localStorage.setItem("notes", JSON.stringify(state.notes));
      }
    },

    // ✅ DELETE CATEGORY
    deleteCategory: (state, action) => {
      const name = action.payload;

      state.categories = state.categories.filter((c) => c !== name);

      // ✅ Reset notes that had this category
      state.notes.forEach((note) => {
        if (note.category === name) {
          note.category = "All";
        }
      });

      // ✅ Reset filter if needed
      if (state.filterCategory === name) {
        state.filterCategory = "All";
      }

      localStorage.setItem("categories", JSON.stringify(state.categories));
      localStorage.setItem("notes", JSON.stringify(state.notes));
    },

    // ✅ FILTER CATEGORY
    setFilterCategory: (state, action) => {
      state.filterCategory = action.payload;
    },

    // ✅ SEARCH NOTES
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },

    // ✅ STARRED FILTER
    setShowStarredOnly: (state, action) => {
      state.showStarredOnly = action.payload;
    },

    // ✅ LOAD FROM LOCAL STORAGE
    loadFromLocalStorage: (state) => {
      state.notes = JSON.parse(localStorage.getItem("notes")) || [];
      state.categories = JSON.parse(localStorage.getItem("categories")) || [];
    },
  },
});

// ✅ EXPORT ALL ACTIONS (NO MORE MISSING ERRORS)
export const {
  addNote,
  deleteNote,
  toggleStar,
  editNote,
  addCategory,
  editCategory,
  deleteCategory,
  setFilterCategory,
  setSearchQuery,
  setShowStarredOnly,
  loadFromLocalStorage,
} = notesSlice.actions;

// ✅ SELECTOR WITH ALL FILTERS
export const selectFilteredNotes = (state) => {
  const {
    notes,
    filterCategory,
    searchQuery,
    showStarredOnly,
  } = state.notes;

  let filtered = notes;

  // Category filter
  if (filterCategory !== "All") {
    filtered = filtered.filter((n) => n.category === filterCategory);
  }

  // Starred filter
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
