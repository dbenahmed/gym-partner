import express from 'express';
import authMiddleware from '../middleware/authMiddlewares.js';
const router = express.Router();
const { getAllMeals, getMealDetails } = require('../controllers/mealDatabaseControllers.js');

// Get a list of all available meals
router.get('/explore/meals', authMiddleware, getAllMeals);

// Get detailed nutritional info for a specific meal
router.get('/explore/meals/:mealId', authMiddleware, getMealDetails);

export default router; 