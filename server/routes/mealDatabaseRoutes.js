import express from 'express';
const router = express.Router();
const { getAllMeals, getMealDetails } = require('../controllers/mealDatabaseControllers.js');

// Get a list of all available meals
router.get('/explore/meals', getAllMeals);

// Get detailed nutritional info for a specific meal
router.get('/explore/meals/:mealId', getMealDetails);

export default router; 