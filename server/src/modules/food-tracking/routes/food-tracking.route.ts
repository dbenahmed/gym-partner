import { Router } from 'express';
import authMiddleware from '@/core/middlewares/authMiddlewares.js';
const router: Router = Router();
import { getUserFoodsByDate, logUserFoodForDate, updateUserLoggedFood, deleteUserLoggedFood } from '@/modules/food-tracking/controllers/food-tracking.controller.js';

// Get a list of meals logged for today
router.get('/meals', authMiddleware, getUserFoodsByDate);

// Add a new meal to today's log
router.post('/meals', authMiddleware, logUserFoodForDate);

// Update an existing meal in today's log
router.put('/meals/:mealId', authMiddleware, updateUserLoggedFood);

// Delete a meal from today's log
router.delete('/meals/:mealId', authMiddleware, deleteUserLoggedFood);

export default router; 
