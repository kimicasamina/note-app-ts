import { Router } from 'express';
import {
  createNote,
  getNotes,
  getNoteById,
  updateNote,
  deleteNote,
} from '../controllers/noteController';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();

router.post('/', authenticate, createNote); // Create a note
router.get('/', authenticate, getNotes); // Get all notes, filtered by category_id (optional)
router.get('/:id', authenticate, getNoteById); // Get a single note by ID
router.put('/:id', authenticate, updateNote); // Update a note by ID
router.delete('/:id', authenticate, deleteNote); // Delete a note by ID

export default router;
