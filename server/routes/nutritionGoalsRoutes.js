const express = require('express');
const router = express.Router();
const { getNutritionGoals, setNutritionGoals, getRemainingNutrition } = require('../controllers/nutritionGoalsControllers.js');

// Get the user's daily nutrition goals
router.get('/nutrition/goals', getNutritionGoals);

// Set or update daily nutrition goals
router.put('/nutrition/goals', setNutritionGoals);

// Get remaining calories/macros for today
router.get('/nutrition/remaining', getRemainingNutrition);

module.exports = router; 