import { Router } from 'express';
import { createUser, getUsers } from '../controllers/userController';

const router: Router = Router();

// Route to create a new user
router.post('/', createUser);

// Route to get all users
router.get('/', getUsers);

export default router;
