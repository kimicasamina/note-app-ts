import React, { useState } from "react";

export default function useCategory() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);
    console.log("SELECTED ITEM", category);
  };

  return { selectedCategory, handleSelectCategory };
}
