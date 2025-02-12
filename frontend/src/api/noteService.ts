import axiosClient from "@utils/axiosClient";
import { Note } from "types/types";

// **Error Response Interface**
interface ErrorResponse {
  message: string;
}

type CreateNoteApiProps = {
  title: string;
  content: string;
};

// **Create Note API**
export const createNoteApi = async (
  title: string,
  content: string,
  category_id: string
): Promise<Note> => {
  try {
    const response = await axiosClient.post("/api/notes", {
      title,
      content,
      category_id,
    });
    return response.data.note;
  } catch (error: any) {
    // Handle errors (e.g. 400 Bad Request)
    throw new Error(error.response?.data?.message || "Failed to create note");
  }
};

// **Get All Notes**
export const getNotesApi = async (category_id?: string): Promise<Note[]> => {
  try {
    // If category_id is provided, add it as a query parameter
    const url = category_id
      ? `/api/notes?category_id=${category_id}`
      : "/api/notes";
    const response = await axiosClient.get(url);
    return response.data.notes;
  } catch (error: any) {
    // Handle errors (e.g. 500 Internal Server Error)
    throw new Error(error.response?.data?.message || "Failed to fetch notes");
  }
};

// **Update Note API**
export const updateNoteApi = async (
  noteId: string,
  note: Note
): Promise<Note> => {
  try {
    const response = await axiosClient.put(`/api/notes/${noteId}`, { ...note });
    return response.data.note;
  } catch (error: any) {
    // Handle errors (e.g. 400 Bad Request)
    throw new Error(error.response?.data?.message || "Failed to update note");
  }
};

// **Delete Note API**
export const deleteNoteApi = async (noteId: string): Promise<void> => {
  try {
    await axiosClient.delete(`/api/notes/${noteId}`);
  } catch (error: any) {
    // Handle errors (e.g. 404 Not Found, 500 Internal Server Error)
    throw new Error(error.response?.data?.message || "Failed to delete note");
  }
};
