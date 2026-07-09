import { Router } from 'express';
import authMiddleware from '../middleware/authMiddlewares.js';
const router: Router = Router();
import { voteForMeal, getMealVotes } from '../controllers/meal-voting.controller.js';

// Vote for a meal
router.post('/meals/:mealId/vote', authMiddleware, voteForMeal);

// Get the total votes for a specific meal
router.get('/meals/:mealId/votes', authMiddleware, getMealVotes);

export default router; 