import express from 'express';
const router = express.Router();
const { getWorkoutTemplates, createWorkoutTemplate, updateWorkoutTemplate, deleteWorkoutTemplate } = require('../controllers/adminDashboardControllers.js');

// Get a list of all workout templates
router.get('/admin/templates', getWorkoutTemplates);

// Create a new workout template
router.post('/admin/templates', createWorkoutTemplate);

// Update a workout template
router.put('/admin/templates/:templateId', updateWorkoutTemplate);

// Delete a workout template
router.delete('/admin/templates/:templateId', deleteWorkoutTemplate);

export default router; 