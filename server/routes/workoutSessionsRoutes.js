const express = require('express');
const router = express.Router();
const { startWorkoutSession, getWorkoutSessions, getWorkoutSessionDetails, addExerciseToSession, logSetForExercise, updateWorkoutSession, deleteWorkoutSession } = require('../controllers/workoutSessionsControllers.js');

// Start a new workout session
router.post('/workout/sessions', startWorkoutSession);

// Get a list of past workout sessions for the user
router.get('/workout/sessions', getWorkoutSessions);

// Get details of a specific session
router.get('/workout/sessions/:sessionId', getWorkoutSessionDetails);

// Add an exercise to an active session
router.post('/workout/sessions/:sessionId/exercises', addExerciseToSession);

// Log a set for an exercise
router.post('/workout/sessions/:sessionId/sets', logSetForExercise);

// Update session details
router.put('/workout/sessions/:sessionId', updateWorkoutSession);

// Delete a session
router.delete('/workout/sessions/:sessionId', deleteWorkoutSession);

module.exports = router; 