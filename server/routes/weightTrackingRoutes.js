import express from 'express';
const router = express.Router();
const { getWeightLogs, logWeightEntry, updateWeightEntry, deleteWeightEntry } = require('../controllers/weightTrackingControllers.js');

// Get a history of the user's weight logs
router.get('/weight', getWeightLogs);

// Log a new weight entry
router.post('/weight', logWeightEntry);

// Update a specific weight entry
router.put('/weight/:entryId', updateWeightEntry);

// Delete a specific weight entry
router.delete('/weight/:entryId', deleteWeightEntry);

export default router; 