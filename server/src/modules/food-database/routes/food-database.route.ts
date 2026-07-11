import { Router } from 'express';
import authMiddleware from '@/core/middlewares/authMiddlewares.js';
const router: Router = Router();
import { getAllFoodsByQueries, getFoodDetailsById } from '@/modules/food-database/controllers/food-database.controller.js';

// Get a list of all available meals
router.get('/explore/meals', authMiddleware, getAllFoodsByQueries);

// Get detailed nutritional info for a specific meal
router.get('/explore/meals/:mealId', authMiddleware, getFoodDetailsById);

export default router; 
