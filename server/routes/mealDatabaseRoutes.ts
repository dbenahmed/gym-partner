import { Router } from 'express';
import authMiddleware from '../middleware/authMiddlewares.js';
const router: Router = Router();
import { getAllMeals, getMealDetails } from '../controllers/mealDatabaseControllers.js';

// Get a list of all available meals
router.get('/explore/meals', authMiddleware, getAllMeals);

// Get detailed nutritional info for a specific meal
router.get('/explore/meals/:mealId', authMiddleware, getMealDetails);

export default router; 