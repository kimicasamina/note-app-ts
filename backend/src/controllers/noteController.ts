import { Request, Response, NextFunction } from 'express';
import {
  createNoteService,
  getNotesService,
  getNoteByIdService,
  updateNoteService,
  deleteNoteService,
} from '../services/noteService';
import { CustomError } from '../utils/customError';

export const createNote = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { title, content, user_id, category_id } = req.body;

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

export const getNotes = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const notes = await getNotesService();
    res.status(200).json({ notes, message: 'Notes retrieved successfully.' });
  } catch (error) {
    next(error);
  }
};

export const getNoteById = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const noteId = req.params.id;
    const note = await getNoteByIdService(noteId);

    if (!note) {
      throw new CustomError('Note not found', 404);
    }

    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};

export const updateNote = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const noteId = req.params.id;
    const { title, content, category_id } = req.body;

    const updatedNote = await updateNoteService(
      noteId,
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

export const deleteNote = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const noteId = req.params.id;
    const result = await deleteNoteService(noteId);

    console.log('TRUE:', result);

    if (!result) {
      throw new CustomError('Note not found', 404);
    }

    // res.status(204).send({ message: 'Note successfully deleted.' });
    res.status(200).send({ message: 'Note successfully deleted.' });
  } catch (error) {
    next(error);
  }
};
