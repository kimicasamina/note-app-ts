import { create } from "zustand";

// Define the store interface with state variables and methods
interface Store {
  selectedCategory: string | null;
  selectedNote: string | null;
  setSelectedCategory: (categoryId: string | null) => void;
  setSelectedNote: (noteId: string | null) => void;
  resetState: () => void; // For resetting the store state
}

// Create the store with initial state and actions
export const useStore = create<Store>((set) => ({
  selectedCategory: null,
  selectedNote: null,
  setSelectedCategory: (categoryId: string | null) =>
    set({ selectedCategory: categoryId }),
  setSelectedNote: (noteId: string | null) => set({ selectedNote: noteId }),
  resetState: () => set({ selectedCategory: null, selectedNote: null }),
}));
