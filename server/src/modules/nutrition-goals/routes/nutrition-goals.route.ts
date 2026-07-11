import { Router } from 'express';
import authMiddleware from '@/core/middlewares/authMiddlewares.js';
const router: Router = Router();
import { getNutritionGoals, setNutritionGoals, getRemainingNutrition } from '@/modules/nutrition-goals/controllers/nutrition-goals.controller.js';

// Get the user's daily nutrition goals
router.get('/nutrition/goals', authMiddleware, getNutritionGoals);

// Set or update daily nutrition goals
router.put('/nutrition/goals', authMiddleware, setNutritionGoals);

// Get remaining calories/macros for today
router.get('/nutrition/remaining', authMiddleware, getRemainingNutrition);

export default router; 
