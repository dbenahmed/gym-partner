const express = require('express');
const router = express.Router();
const { createCustomMeal, getCustomMeals, updateCustomMeal, deleteCustomMeal } = require('../controllers/customFoodTrackingControllers.js');

// Create a new custom meal
router.post('/meals/custom', createCustomMeal);

// Get a list of all custom meals created by the user
router.get('/meals/custom', getCustomMeals);

// Update a custom meal
router.put('/meals/custom/:mealId', updateCustomMeal);

// Delete a custom meal
router.delete('/meals/custom/:mealId', deleteCustomMeal);

module.exports = router; 