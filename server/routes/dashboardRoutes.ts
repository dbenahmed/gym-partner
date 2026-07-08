import { Router } from 'express';
import authMiddleware from '../middleware/authMiddlewares.js';
const router: Router = Router();
import { getDashboardData } from '../controllers/dashboardControllers.js';

// Get dashboard data
router.get('/dashboard', authMiddleware, getDashboardData);

export default router; 