import express from 'express';
import authMiddleware from '../middleware/authMiddlewares.js';
const router = express.Router();
import { getNutritionGoals, setNutritionGoals, getRemainingNutrition } from '../controllers/nutritionGoalsControllers.js';

// Get the user's daily nutrition goals
router.get('/nutrition/goals', authMiddleware, getNutritionGoals);

// Set or update daily nutrition goals
router.put('/nutrition/goals', authMiddleware, setNutritionGoals);

// Get remaining calories/macros for today
router.get('/nutrition/remaining', authMiddleware, getRemainingNutrition);

export default router; 