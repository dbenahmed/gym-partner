import express from 'express';
import authMiddleware from '../middleware/authMiddlewares.js';
const router = express.Router();
import { voteForMeal, getMealVotes } from '../controllers/mealVotingControllers.js';
// Vote for a meal
router.post('/meals/:mealId/vote', authMiddleware, voteForMeal);
// Get the total votes for a specific meal
router.get('/meals/:mealId/votes', authMiddleware, getMealVotes);
export default router;
