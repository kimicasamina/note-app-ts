import React from "react";
import "./index.css";
import { useMutation, useQuery } from "react-query";
import { getCategoriesApi } from "@api/categoriesApi";
import LoadingDots from "@components/ui/loading-dots";
import useCategory from "@hooks/useCategory";
import { useSelectedItem } from "@services/context/selectedItemContext";
import Button from "@components/ui/button";
import AddButton from "@components/ui/add-button";

export default function CategoryList() {
  const { selectedCategory, onSelectCategory } = useSelectedItem();
  const {
    data: categories,
    isLoading,
    isError,
    error,
  } = useQuery("categories", getCategoriesApi, {
    // refetchOnWindowFocus: false, // Prevent refetching when window is focused
    // refetchOnMount: false, // Prevent refetching when component is mounted
    // staleTime: 8000, // Prevent data from becoming stale
  });

  if (isLoading) {
    return <LoadingDots />;
  }

  if (isError) {
    return (
      <div>
        <h1>Error</h1>
        <p>
          {(error as Error).message} || 'Unable to retrieve Categories data'
        </p>
      </div>
    );
  }

  return (
    <div className="category-list">
      <ul>
        {categories?.map((category: { id: string; name: string }) => (
          <li
            className={`category-item ${selectedCategory == category.id ? "active" : null}`}
            key={category.id}
            onClick={() => onSelectCategory(category.id)}
          >
            {category.name}
            <span className="category-buttons">
              <button className="category-buttons--delete">Delete</button>
              <button className="category-buttons--edit">Edit</button>
            </span>
          </li>
        ))}
      </ul>
      <input type="text" className="category__new" placeholder="Add new..." />
    </div>
  );
}
