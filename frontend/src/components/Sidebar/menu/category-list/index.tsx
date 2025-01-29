import React, { ReactNode } from "react";

type ItemProps = {
  id: number;
  name: string;
  label: string;
};

interface CategoryListProps {
  items: ItemProps[];
  render: (item: ItemProps) => ReactNode;
  onSelectMenu: (categoryName: string) => void;
}

export default function CategoryList({
  items,
  render,
  onSelectMenu,
}: CategoryListProps) {
  return (
    <ul>
      {items.map((item) => (
        <CategoryItem key={item.id} item={item} onSelectMenu={onSelectMenu}>
          {render(item)}
        </CategoryItem>
      ))}
    </ul>
  );
}

type CategoryItemProps = {
  item: ItemProps;
  onSelectMenu: (categoryName: string) => void;
};

export function CategoryItem({ item, onSelectMenu }: CategoryItemProps) {
  return <li onClick={() => onSelectMenu(item.name)}>{item.label}</li>;
}
