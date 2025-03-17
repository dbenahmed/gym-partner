const express = require('express');
const router = express.Router();
const { getTodayMeals, addTodayMeal, updateTodayMeal, deleteTodayMeal } = require('../controllers/foodTrackingControllers.js');

// Get a list of meals logged for today
router.get('/meals/today', getTodayMeals);

// Add a new meal to today's log
router.post('/meals/today', addTodayMeal);

// Update an existing meal in today's log
router.put('/meals/today/:mealId', updateTodayMeal);

// Delete a meal from today's log
router.delete('/meals/today/:mealId', deleteTodayMeal);

module.exports = router; 