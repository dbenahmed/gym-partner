import { Router } from 'express';
import authMiddleware from '@/core/middlewares/authMiddlewares.js';
const router: Router = Router();
import { voteForFood, getFoodVotes } from '@/modules/food-voting/controllers/food-voting.controller.js';

// Vote for a meal
router.post('/meals/:mealId/vote', authMiddleware, voteForFood);

// Get the total votes for a specific meal
router.get('/meals/:mealId/votes', authMiddleware, getFoodVotes);

export default router; 
