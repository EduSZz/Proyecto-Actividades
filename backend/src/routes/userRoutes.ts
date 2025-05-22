import { Router } from 'express';
import { registerUser, loginUser, updateUser } from '../controllers/userController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/update', authenticateToken, updateUser);

export default router;