import { Router } from 'express';
import {
  login,
  logout,
  register,
  getUserDetails,
} from '../controllers/authController';
import { authenticate } from '../middleware/authMiddleware';
const router: Router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', authenticate, getUserDetails);
router.delete('/logout', authenticate, logout);

export default router;
