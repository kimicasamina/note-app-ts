import React, { useState } from "react";
import { Category } from "types/types";
import { CgTrashEmpty, CgPen } from "react-icons/cg";
import "./index.css";
import { useStore } from "@store/useStore";

interface CategoryItemProps {
  category: Category;
  // onSelect: (categoryId: string) => void;
  onUpdate: (categoryId: string, categoryName: string) => void;
  onDelete: (categoryId: string) => void;
  // selectedCategory: string | null;
}

const CategoryItem = ({ category, onUpdate, onDelete }: CategoryItemProps) => {
  const { setSelectedCategory, selectedCategory, resetState } = useStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editableName, setEditableName] = useState(category.name);

  const handleSaveChanges = () => {
    if (editableName !== category.name) {
      onUpdate(category.id, editableName); // Only update if the name has changed
    }
    setIsEditing(false); // Exit edit mode
  };

  const handleKeyUp = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSaveChanges(); // Save changes when Enter key is pressed
    }
  };

  const handleBlur = () => {
    handleSaveChanges(); // Save changes when the input loses focus
  };

  const handleSelectCategory = () => {
    resetState();
    setSelectedCategory(category.id);
  };

  return (
    <li
      className={`category-item ${selectedCategory === category.id ? "active" : ""}`}
      onClick={handleSelectCategory} // Allow selection by clicking on the list item
    >
      {isEditing ? (
        <input
          type="text"
          value={editableName}
          onChange={(e) => setEditableName(e.target.value)}
          onKeyUp={handleKeyUp}
          onBlur={handleBlur}
          autoFocus
        />
      ) : (
        <span className="category-item__name">{category.name}</span>
      )}

      <span className="category-item__buttons">
        <button
          className="category-item__buttons--delete"
          onClick={(e) => {
            e.stopPropagation(); // Prevent triggering onSelect on delete button click
            onDelete(category.id); // Pass category ID to delete function
          }}
        >
          <CgTrashEmpty />
        </button>
        <button
          className="category-item__buttons--edit"
          onClick={(e) => {
            e.stopPropagation(); // Prevent triggering onSelect on edit button click
            setIsEditing(true); // Enter editing mode
          }}
        >
          <CgPen />
        </button>
      </span>
    </li>
  );
};

export default CategoryItem;
