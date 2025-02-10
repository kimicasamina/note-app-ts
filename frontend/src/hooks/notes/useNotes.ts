import { useQuery, useMutation } from "react-query";
import { queryClient } from "@utils/queryClient";
import { Note } from "types/types";
import {
  getNotesApi,
  createNoteApi,
  updateNoteApi,
  deleteNoteApi,
} from "@api/noteService";

// Fetch all notes, with optional filtering by category_id
export const useNotes = (category_id?: string) => {
  return useQuery(
    ["notes", category_id], // Add category_id as part of the query key for caching
    () => getNotesApi(category_id),
    {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
      onError: (error: any) => {
        console.error("Error fetching notes:", error.message);
      },
    }
  );
};

// Mutation for creating a new note
export const useCreateNote = () => {
  return useMutation(
    ({
      title,
      content,
      category_id,
    }: {
      title: string;
      content: string;
      category_id: string;
    }) => createNoteApi(title, content, category_id),
    {
      onSuccess: () => {
        // Invalidate the cache to refetch notes after a successful mutation
        queryClient.invalidateQueries("notes");
      },
      onError: (error: any) => {
        console.error("Error creating note:", error.message);
      },
    }
  );
};

interface updateNoteProps {
  noteId: string;
  note: Note;
}

export const useUpdateNote = () => {
  return useMutation(
    ({ noteId, note }: updateNoteProps) => updateNoteApi(noteId, note), // Wrap in a function that passes the correct signature
    {
      onSuccess: () => {
        queryClient.invalidateQueries("notes");
      },
      onError: (error: any) => {
        console.error("Error updating note:", error.message);
      },
    }
  );
};

// Mutation for deleting a note
export const useDeleteNote = () => {
  return useMutation((noteId: string) => deleteNoteApi(noteId), {
    onSuccess: () => {
      queryClient.invalidateQueries("notes");
    },
    onError: (error: any) => {
      console.error("Error deleting note:", error.message);
    },
  });
};
