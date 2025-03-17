import express from 'express';
const router = express.Router();
const { getUserWorkoutTemplates } = require('../controllers/workoutTemplatesControllers.js');

// Get a list of predefined workout templates available to users
router.get('/templates', getUserWorkoutTemplates);

export default router;