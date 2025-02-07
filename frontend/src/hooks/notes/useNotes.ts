import { useQuery, useMutation, useQueryClient } from "react-query";
import { addNote, updateNote, deleteNote } from "@api/authApi";
import { getCurrentUser } from "@api/authApi";
import { Note } from "types/types";

export const useNotes = () => {
  const queryClient = useQueryClient();

  // Fetch notes for the current user
  const {
    data: notes,
    isLoading,
    isError,
  } = useQuery<Note[], Error>(["notes"], async () => {
    const user = await getCurrentUser();
    return user ? user.notes : [];
  });

  // Add note
  const { mutate: addNewNote } = useMutation(addNote, {
    onSuccess: () => {
      queryClient.invalidateQueries(["notes"]);
    },
  });

  // Update note
  const { mutate: updateExistingNote } = useMutation(updateNote, {
    onSuccess: () => {
      queryClient.invalidateQueries(["notes"]);
    },
  });

  // Delete note
  const { mutate: deleteExistingNote } = useMutation(deleteNote, {
    onSuccess: () => {
      queryClient.invalidateQueries(["notes"]);
    },
  });

  return {
    notes,
    isLoading,
    isError,
    addNewNote,
    updateExistingNote,
    deleteExistingNote,
  };
};
