import { Router } from 'express';
import authMiddleware from '../middleware/authMiddlewares.js';
const router: Router = Router();
import { getUserWorkoutTemplates } from '../controllers/workoutTemplatesControllers.js'

// Get a list of predefined workout templates available to users
router.get('/templates', authMiddleware, getUserWorkoutTemplates);

export default router;