import React from "react";
import "./index.css";
import { CgMathPlus } from "react-icons/cg";
type CategoryCreateProps = {
  newCategoryName: string;
  setNewCategoryName: (name: string) => void;
  handleCreateCategory: () => void;
};

export default function CategoryCreate({
  newCategoryName,
  setNewCategoryName,
  handleCreateCategory,
}: CategoryCreateProps) {
  return (
    <div className="category-create">
      <input
        className="category-input"
        type="text"
        value={newCategoryName}
        onChange={(e) => setNewCategoryName(e.target.value)}
        placeholder="New category name"
      />
      <button className="category-addbtn" onClick={handleCreateCategory}>
        <CgMathPlus />
      </button>
    </div>
  );
}
