import React, { createContext, ReactNode, useContext, useState } from "react";

// Define the types for the context value
type SelectedItemContextType = {
  selectedCategory: string | null;
  onSelectCategory: (item: string) => void;
  clearSelection: () => void;
  selectedNote: string | null;
  onSelectNote: (item: string) => void;
};

// Create the context with an undefined default value
const SelectedItemContext = createContext<SelectedItemContextType | undefined>(
  undefined
);

// Custom hook to use the context
export const useSelectedItem = () => {
  const context = useContext(SelectedItemContext);

  // Ensure that the context is not undefined
  if (!context) {
    throw new Error(
      "useSelectedItem must be used within a SelectedItemProvider"
    );
  }

  return context;
};

// Define the type for the provider props
type SelectedItemProviderProps = {
  children: ReactNode;
};

// The provider component to wrap the application or parts of it
export const SelectedItemProvider = ({
  children,
}: SelectedItemProviderProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedNote, setSelectedNote] = useState<string | null>(null);

  // Function to select a category
  const onSelectCategory = (item: string) => {
    setSelectedCategory(item);
    setSelectedNote(null);
  };

  // Function to clear the selected category
  const clearSelection = () => {
    setSelectedCategory(null);
  };

  // Function to select a note
  const onSelectNote = (item: string) => {
    setSelectedNote(item);
  };

  return (
    <SelectedItemContext.Provider
      value={{
        selectedCategory,
        onSelectCategory,
        clearSelection,
        selectedNote,
        onSelectNote,
      }}
    >
      {children}
    </SelectedItemContext.Provider>
  );
};
