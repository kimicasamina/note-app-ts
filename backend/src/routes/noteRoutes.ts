// src/routes/noteRoutes.ts
import { Router } from 'express';
import {
  createNote,
  getNotes,
  getNoteById,
  updateNote,
  deleteNote,
} from '../controllers/noteController';

const router = Router();

router.post('/', createNote); // Create a note
router.get('/', getNotes); // Get all notes
router.get('/:id', getNoteById); // Get a single note by ID
router.put('/:id', updateNote); // Update a note by ID
router.delete('/:id', deleteNote); // Delete a note by ID

export default router;
