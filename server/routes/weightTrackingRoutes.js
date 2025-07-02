import express from 'express';
import authMiddleware from '../middleware/authMiddlewares.js';
const router = express.Router();
import WeightController from '../controllers/weightTrackingControllers.js';

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