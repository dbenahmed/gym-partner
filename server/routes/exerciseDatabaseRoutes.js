import express from 'express';
import authMiddleware from '../middleware/authMiddlewares.js';
const router = express.Router();
import { createNewExercise, deleteExercise, getAllExercises, getExerciseDetails, updateExercise, getLatestExerciseStats } from '../controllers/exerciseDatabaseControllers.js';


//* done
// Get a list of all available exercises
router.get('/explore/exercises', getAllExercises);

// Get details for a specific exercise
router.get('/explore/exercises/:exerciseId', authMiddleware, getExerciseDetails);
//* done

// Create a new exercise
router.post('/explore/exercises', authMiddleware, createNewExercise);

// Update an exercise
router.put('/explore/exercises/:exerciseId', authMiddleware, updateExercise);

// Delete an exercise
router.delete('/explore/exercises/:exerciseId', authMiddleware, deleteExercise);

// Get latest data of an exercise ( latest reps sets weights sessions ...)
router.get('/exercise/statistics/:exerciseId', authMiddleware, getLatestExerciseStats);

export default router; 