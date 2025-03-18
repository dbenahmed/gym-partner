import express from 'express';
const router = express.Router();
const { getWorkoutHistory, getExerciseHistory } = require('../controllers/workoutHistoryControllers.js');

// Get a detailed history of all past sessions
router.get('/workout/history', getWorkoutHistory);

// Get performance history for a specific exercise
router.get('/workout/history/exercises/:exerciseId', getExerciseHistory);

export default router;