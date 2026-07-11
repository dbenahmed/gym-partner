import { Router } from 'express';
import authMiddleware from '@/core/middlewares/authMiddlewares.js';
import WeightController from '@/modules/body-weight-tracking/controllers/body-weight-tracking.controller.js';

const router: Router = Router();
const { getWeightLogs, logWeightEntry, updateWeightEntry, deleteWeightEntry } = new WeightController();

// Get a history of the user's weight logs
router.get('/weight', authMiddleware, getWeightLogs);

// Log a new weight entry
router.post('/weight', authMiddleware, logWeightEntry);

// Update a specific weight entry
router.put('/weight/:entryId', authMiddleware, updateWeightEntry);

// Delete a specific weight entry
router.delete('/weight/:entryId', authMiddleware, deleteWeightEntry);

export default router;
