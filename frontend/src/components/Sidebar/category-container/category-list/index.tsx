import React from "react";

const category = [
  {
    id: 1,
    name: "Programming",
  },
  {
    id: 2,
    name: "Cooking",
  },
  {
    id: 3,
    name: "Journal",
  },
];

export default function CategoryList() {
  return (
    <ul className="category">
      {category &&
        category.map((item) => (
          <li className="category__item" key={item.id}>
            <span className="category__name">{item.name}</span>
          </li>
        ))}
    </ul>
  );
}
