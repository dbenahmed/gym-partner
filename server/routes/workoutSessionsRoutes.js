import express from 'express';
import authMiddleware from '../middleware/authMiddlewares.js';
const router = express.Router();
import { createWorkoutSession, getWorkoutSessions, getWorkoutSessionDetails, saveExerciseToSession, logSetForExercise, updateWorkoutSession, deleteWorkoutSession } from '../controllers/workoutSessionsControllers.js';

// Start a new workout session
router.post('/workout/sessions', authMiddleware, createWorkoutSession);

// todo later  low priority: - Get a list of past workout sessions for the user
router.get('/workout/sessions', authMiddleware, getWorkoutSessions);

// IGNORED - Get details of a specific session
router.get('/workout/sessions/:sessionId', authMiddleware, getWorkoutSessionDetails);

// Add an exercise to an active session including its sets and reps ( user add an exercise in his client interface not in the database when he logs all of his sets he taps a button to save this exercise to this session )
router.post('/workout/sessions/:sessionId/exercises', authMiddleware, saveExerciseToSession);

// IGNORED - Log a set for an exercise
router.post('/workout/sessions/:sessionId/sets', authMiddleware, logSetForExercise);

// Update session details
router.put('/workout/sessions/:sessionId', authMiddleware, updateWorkoutSession);

// Delete a session
router.delete('/workout/sessions/:sessionId', authMiddleware, deleteWorkoutSession);

export default router;