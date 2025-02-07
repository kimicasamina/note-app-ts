export const fetchCategories = async () => {
  const response = await fetch("/api/categories");
  if (!response.ok) {
    throw new Error("Error fetching categories");
  }
  return response.json();
};

export const fetchNotes = async (categoryId: string) => {
  const response = await fetch(`/api/notes?category=${categoryId}`);
  if (!response.ok) {
    throw new Error("Error fetching notes");
  }
  return response.json();
};

export const fetchNote = async (noteId: string) => {
  const response = await fetch(`/api/notes/${noteId}`);
  if (!response.ok) {
    throw new Error("Error fetching note");
  }
  return response.json();
};
