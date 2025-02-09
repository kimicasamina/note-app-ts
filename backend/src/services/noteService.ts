import Note from '../models/Note';
import { CustomError } from '../utils/customError';

// Create a new note
export const createNoteService = async (
  title: string,
  content: string,
  user_id: string,
  category_id: string,
) => {
  return await Note.create({ title, content, user_id, category_id });
};

// Get all notes for a user, optionally filtered by category_id
export const getNotesService = async (
  user_id: string,
  category_id?: string,
) => {
  const filterOptions: any = { where: { user_id } };

  if (category_id) {
    filterOptions.where.category_id = category_id;
  }

  const notes = await Note.findAll(filterOptions);

  if (notes.length === 0) {
    throw new CustomError('No notes found for this user', 404);
  }

  return notes;
};

// Get a single note by user_id and note_id
export const getNoteByIdService = async (user_id: string, note_id: string) => {
  return await Note.findOne({ where: { user_id, id: note_id } });
};

// Update a note for the user
export const updateNoteService = async (
  user_id: string,
  note_id: string,
  title?: string,
  content?: string,
  category_id?: string,
) => {
  const note = await Note.findOne({ where: { user_id, id: note_id } });
  if (!note) throw new CustomError('Note not found', 404);

  if (title) note.title = title;
  if (content) note.content = content;
  if (category_id) note.category_id = category_id;

  await note.save();
  return note;
};

// Delete a note for the user
export const deleteNoteService = async (user_id: string, note_id: string) => {
  const note = await Note.findOne({ where: { user_id, id: note_id } });
  if (!note) return null;

  await note.destroy();
  return true;
};
