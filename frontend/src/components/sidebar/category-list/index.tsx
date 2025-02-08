import React, { useState } from "react";
import {
  useCategories,
  useCreateCategory,
  useDeleteCategory,
  useUpdateCategory,
} from "@hooks/categories/useCategories";
import LoadingDots from "@components/ui/loading-dots";
import { Category } from "types/types";
import { useSelectedItem } from "@services/context/selectedItemContext";
import CategoryItem from "./category-item";
import CategoryCreate from "./category-create";

export default function CategoryList() {
  const { selectedCategory, onSelectCategory } = useSelectedItem();
  const { data: categories, isLoading, isError, error } = useCategories();
  const { mutate: createCategory } = useCreateCategory();
  const { mutate: updateCategory } = useUpdateCategory();
  const { mutate: deleteCategory } = useDeleteCategory();

  const [newCategoryName, setNewCategoryName] = useState("");

  const handleCreateCategory = () => {
    if (newCategoryName) {
      createCategory(newCategoryName);
      setNewCategoryName(""); // Reset input field after creation
    }
  };

  const handleUpdateCategory = (categoryId: string, categoryName: string) => {
    updateCategory({ categoryId, categoryName });
  };

  const handleDeleteCategory = (categoryId: string) => {
    deleteCategory(categoryId);
  };

  return (
    <div className="category-container">
      <CategoryCreate
        newCategoryName={newCategoryName}
        setNewCategoryName={setNewCategoryName}
        handleCreateCategory={handleCreateCategory}
      />

      {isLoading ? (
        // <h1 className="">Loading list...</h1>
        <LoadingDots
          size="24px"
          // color="purple"
          className="custom-style" // Use custom CSS class
          styles={{
            marginBottom: "20px",
            marginTop: "20px",
            width: "35%",
            justifyContent: "center",
          }} // Inline style customization
        />
      ) : (
        <ul className="category-list fade-in ">
          {categories?.map((category: Category) => (
            <CategoryItem
              key={category.id}
              category={category}
              selectedCategory={selectedCategory}
              onSelect={onSelectCategory}
              onUpdate={handleUpdateCategory}
              onDelete={handleDeleteCategory}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
