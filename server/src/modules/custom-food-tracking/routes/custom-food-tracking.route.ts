import { Router } from 'express';
import authMiddleware from '@/core/middlewares/authMiddlewares.js';
import { createUserCustomFood, getAllUserCustomFoods, updateUserCustomFood, deleteUserCustomFood } from '@/modules/custom-food-tracking/controllers/custom-food-tracking.controller.js';

const router: Router = Router();

// Create a new custom meal
router.post('/meals/custom', authMiddleware, createUserCustomFood);

// Get a list of all custom meals created by the user
router.get('/meals/custom', authMiddleware, getAllUserCustomFoods);

// Update a custom meal
router.put('/meals/custom/:mealId', authMiddleware, updateUserCustomFood);

// Delete a custom meal
router.delete('/meals/custom/:mealId', authMiddleware, deleteUserCustomFood);

export default router;
