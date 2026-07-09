import { Router } from 'express';
import authMiddleware from '../middleware/authMiddlewares.js';
import { getAllExercises, getExerciseDetails, getLatestExerciseStats } from '../controllers/exercise-search.controller.js';

const router: Router = Router();

// Get a list of all available exercises
router.get('/explore/exercises', getAllExercises);

// Get details for a specific exercise
router.get('/explore/exercises/:exerciseId', authMiddleware, getExerciseDetails);

// Get latest data of an exercise ( latest reps sets weights sessions ...)
router.get('/exercise/statistics/:exerciseId', authMiddleware, getLatestExerciseStats);

export default router;
