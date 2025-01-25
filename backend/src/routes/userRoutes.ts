import { Router } from 'express';
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from '../controllers/userController';
import { authenticate } from '../middleware/authMiddleware';
const router: Router = Router();

// Route to create a new user
router.post('/', authenticate, createUser);

// Route to get all users
router.get('/', authenticate, getUsers);

// Route to get a single user by ID
router.get('/:id', authenticate, getUserById);

// Route to update a user by ID
router.put('/:id', authenticate, updateUser);

// Route to delete a user by ID
router.delete('/:id', authenticate, deleteUser);

export default router;
