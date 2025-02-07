import React from "react";
import { Category } from "types/types";

interface CategoryItemProps {
  category: Category;
  onSelectCategory: (categoryId: string) => void;
  selectedCategory: string | null;
}

const CategoryItem = ({
  category,
  onSelectCategory,
  selectedCategory,
}: CategoryItemProps) => {
  return (
    <li
      className={`category-item ${selectedCategory === category.id ? "active" : ""}`}
      onClick={() => onSelectCategory(category.id)}
    >
      {category.name}
      <span className="category-buttons">
        <button className="category-buttons--delete">Delete</button>
        <button className="category-buttons--edit">Edit</button>
      </span>
    </li>
  );
};

export default CategoryItem;
