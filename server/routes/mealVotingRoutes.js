import express from 'express';
const router = express.Router();
const { voteForMeal, getMealVotes } = require('../controllers/mealVotingControllers.js');

// Vote for a meal
router.post('/meals/:mealId/vote', voteForMeal);

// Get the total votes for a specific meal
router.get('/meals/:mealId/votes', getMealVotes);

export default router; 