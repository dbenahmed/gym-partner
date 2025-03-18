import express from 'express';
import authMiddleware from '../middleware/authMiddlewares.js';
const router = express.Router();
const { getWorkoutTemplates, createWorkoutTemplate, updateWorkoutTemplate, deleteWorkoutTemplate } = require('../controllers/adminDashboardControllers.js');

// Get a list of all workout templates
router.get('/admin/templates', authMiddleware, getWorkoutTemplates);

// Create a new workout template
router.post('/admin/templates', authMiddleware, createWorkoutTemplate);

// Update a workout template
router.put('/admin/templates/:templateId', authMiddleware, updateWorkoutTemplate);

// Delete a workout template
router.delete('/admin/templates/:templateId', authMiddleware, deleteWorkoutTemplate);

export default router; 