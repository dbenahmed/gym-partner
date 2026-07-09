import { Router } from 'express';
import authMiddleware from '../middleware/authMiddlewares.js';
import { createNewExercise, deleteExercise, updateExercise } from '../controllers/exercise-management.controller.js';

const router: Router = Router();

// Create a new exercise
router.post('/explore/exercises', authMiddleware, createNewExercise);

// Update an exercise
router.put('/explore/exercises/:exerciseId', authMiddleware, updateExercise);

// Delete an exercise
router.delete('/explore/exercises/:exerciseId', authMiddleware, deleteExercise);

export default router;
