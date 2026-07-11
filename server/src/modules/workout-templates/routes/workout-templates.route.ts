import { Router } from 'express';
import authMiddleware from '@/core/middlewares/authMiddlewares.js';
const router: Router = Router();
// import { getUserWorkoutTemplates } from '@/modules/workout-templates/controllers/workout-templates.controller.js'

// Get a list of predefined workout templates available to users
// router.get('/templates', authMiddleware, getUserWorkoutTemplates);

export default router;
