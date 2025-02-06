import React from "react";
import "./index.css";
import { useQuery } from "react-query";
import { getCategoriesApi } from "@api/categoriesApi";
import LoadingDots from "@components/LoadingDots/LoadingDots";

export default function CategoryList() {
  const {
    data: categories,
    isLoading,
    isError,
    error,
  } = useQuery("categories", getCategoriesApi, {
    // refetchOnWindowFocus: false, // Prevent refetching when window is focused
    // refetchOnMount: false, // Prevent refetching when component is mounted
    // staleTime: Infinity, // Prevent data from becoming stale
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
          <li className="category-item active" key={category.id}>
            {category.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
