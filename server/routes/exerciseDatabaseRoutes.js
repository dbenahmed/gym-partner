import express from 'express';
import authMiddleware from '../middleware/authMiddlewares.js';
const router = express.Router();
import { createNewExercise, deleteExercise, getAllExercises, getExerciseDetails, updateExercise } from '../controllers/exerciseDatabaseControllers.js';

// Get a list of all available exercises
router.get('/explore/exercises', authMiddleware, getAllExercises);

// Get details for a specific exercise
router.get('/explore/exercises/:exerciseId', authMiddleware, getExerciseDetails);

// Create a new exercise
router.post('/explore/exercises', authMiddleware, createNewExercise);

// Update an exercise
router.put('/explore/exercises/:exerciseId', authMiddleware, updateExercise);

// Delete an exercise
router.delete('/explore/exercises/:exerciseId', authMiddleware, deleteExercise);

export default router; 