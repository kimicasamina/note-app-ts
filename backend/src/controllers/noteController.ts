import { Request, Response, NextFunction } from 'express';
import {
  createNoteService,
  getNotesService,
  getNoteByIdService,
  updateNoteService,
  deleteNoteService,
} from '../services/noteService';
import { CustomError } from '../utils/customError';

// Create a new note
export const createNote = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const user_id = req.user!.id;
    const { title, content, category_id } = req.body;
    const newNote = await createNoteService(
      title,
      content,
      user_id,
      category_id,
    );
    res.status(201).json({ newNote, message: 'Note created successfully.' });
  } catch (error) {
    next(error);
  }
};

// Get notes for the current user, optionally filtered by category_id
export const getNotes = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const user_id = req.user!.id; // Get current user from req.user
    const { category_id } = req.query; // Get category_id from query parameters

    // Fetch notes filtered by user_id and optionally category_id
    const notes = await getNotesService(user_id, category_id as string);
    res.status(200).json({ notes, message: 'Notes retrieved successfully.' });
  } catch (error) {
    next(error);
  }
};

// Get a note by ID for the current user
export const getNoteById = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const user_id = req.user!.id;
    const note_id = req.params.id;
    const note = await getNoteByIdService(user_id, note_id);

    if (!note) {
      throw new CustomError('Note not found', 404);
    }

    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};

// Update a note by ID for the current user
export const updateNote = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const user_id = req.user!.id;
    const note_id = req.params.id;
    const { title, content, category_id } = req.body;

    const updatedNote = await updateNoteService(
      user_id,
      note_id,
      title,
      content,
      category_id,
    );

    if (!updatedNote) {
      throw new CustomError('Note not found', 404);
    }

    res.status(200).json(updatedNote);
  } catch (error) {
    next(error);
  }
};

// Delete a note by ID for the current user
export const deleteNote = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const user_id = req.user!.id;
    const note_id = req.params.id;
    const result = await deleteNoteService(user_id, note_id);

    if (!result) {
      throw new CustomError('Note not found', 404);
    }

    res.status(200).send({ message: 'Note successfully deleted.' });
  } catch (error) {
    next(error);
  }
};
