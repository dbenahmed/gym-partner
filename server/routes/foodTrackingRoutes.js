import express from 'express';
import authMiddleware from '../middleware/authMiddlewares.js';
const router = express.Router();
import { getTodayMeals, addTodayMeal, updateTodayMeal, deleteTodayMeal } from '../controllers/foodTrackingControllers.js';

// Get a list of meals logged for today
router.get('/meals/today', authMiddleware, getTodayMeals);

// Add a new meal to today's log
router.post('/meals/today', authMiddleware, addTodayMeal);

// Update an existing meal in today's log
router.put('/meals/today/:mealId', authMiddleware, updateTodayMeal);

// Delete a meal from today's log
router.delete('/meals/today/:mealId', authMiddleware, deleteTodayMeal);

export default router; 