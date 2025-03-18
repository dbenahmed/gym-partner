import express from 'express';
import authMiddleware from '../middleware/authMiddlewares.js';
const router = express.Router();
const { getWorkoutHistory, getExerciseHistory } = require('../controllers/workoutHistoryControllers.js');

// Get a detailed history of all past sessions
router.get('/workout/history', authMiddleware, getWorkoutHistory);

// Get performance history for a specific exercise
router.get('/workout/history/exercises/:exerciseId', authMiddleware, getExerciseHistory);

export default router;