import { Router } from 'express';
import authMiddleware from '../middleware/authMiddlewares.js';
import { createCustomMeal, getCustomMeals, updateCustomMeal, deleteCustomMeal } from '../controllers/customFoodTrackingControllers.js';

const router: Router = Router();

// Create a new custom meal
router.post('/meals/custom', authMiddleware, createCustomMeal);

// Get a list of all custom meals created by the user
router.get('/meals/custom', authMiddleware, getCustomMeals);

// Update a custom meal
router.put('/meals/custom/:mealId', authMiddleware, updateCustomMeal);

// Delete a custom meal
router.delete('/meals/custom/:mealId', authMiddleware, deleteCustomMeal);

export default router;
