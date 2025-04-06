import express from 'express';
import authMiddleware from '../middleware/authMiddlewares.js';
const router = express.Router();
import { getMeals, addMeal, updateMeal, deleteMeal } from '../controllers/foodTrackingControllers.js';

// Get a list of meals logged for today
router.get('/meals/today', authMiddleware, getMeals);

// Add a new meal to today's log
router.post('/meals/today', authMiddleware, addMeal);

// Update an existing meal in today's log
router.put('/meals/today/:mealId', authMiddleware, updateMeal);

// Delete a meal from today's log
router.delete('/meals/today/:mealId', authMiddleware, deleteMeal);

export default router; 