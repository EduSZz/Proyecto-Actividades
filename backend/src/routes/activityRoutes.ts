import { Router } from 'express';
import {
  getActivities,
  createActivity,
  updateActivityStatus,
  deleteActivity,
  updateActivity
} from '../controllers/activityController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

router.get('/', authenticateToken, getActivities);
router.post('/', authenticateToken, createActivity);
router.patch('/:id/status', authenticateToken, updateActivityStatus);
router.put('/:id', authenticateToken, updateActivity);
router.delete('/:id', authenticateToken, deleteActivity);

export default router;