import express from 'express';
import authMiddleware from '../middleware/authMiddlewares.js';
const router = express.Router();
import { getAllExercises, getExerciseDetails } from '../controllers/exerciseDatabaseControllers.js';

// Get a list of all available exercises
router.get('/explore/exercises', authMiddleware, getAllExercises);

// Get details for a specific exercise
router.get('/explore/exercises/:exerciseId', authMiddleware, getExerciseDetails);

export default router; 