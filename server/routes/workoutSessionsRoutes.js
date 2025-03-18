import express from 'express';
import authMiddleware from '../middleware/authMiddlewares.js';
const router = express.Router();
const { startWorkoutSession, getWorkoutSessions, getWorkoutSessionDetails, addExerciseToSession, logSetForExercise, updateWorkoutSession, deleteWorkoutSession } = require('../controllers/workoutSessionsControllers.js');

// Start a new workout session
router.post('/workout/sessions', authMiddleware, startWorkoutSession);

// Get a list of past workout sessions for the user
router.get('/workout/sessions', authMiddleware, getWorkoutSessions);

// Get details of a specific session
router.get('/workout/sessions/:sessionId', authMiddleware, getWorkoutSessionDetails);

// Add an exercise to an active session
router.post('/workout/sessions/:sessionId/exercises', authMiddleware, addExerciseToSession);

// Log a set for an exercise
router.post('/workout/sessions/:sessionId/sets', authMiddleware, logSetForExercise);

// Update session details
router.put('/workout/sessions/:sessionId', authMiddleware, updateWorkoutSession);

// Delete a session
router.delete('/workout/sessions/:sessionId', authMiddleware, deleteWorkoutSession);

export default router;