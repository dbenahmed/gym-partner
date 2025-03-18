import express from 'express';
import authMiddleware from '../middleware/authMiddlewares.js';
const router = express.Router();
const { getWeightLogs, logWeightEntry, updateWeightEntry, deleteWeightEntry } = require('../controllers/weightTrackingControllers.js');

// Get a history of the user's weight logs
router.get('/weight', authMiddleware, getWeightLogs);

// Log a new weight entry
router.post('/weight', authMiddleware, logWeightEntry);

// Update a specific weight entry
router.put('/weight/:entryId', authMiddleware, updateWeightEntry);

// Delete a specific weight entry
router.delete('/weight/:entryId', authMiddleware, deleteWeightEntry);

export default router; 