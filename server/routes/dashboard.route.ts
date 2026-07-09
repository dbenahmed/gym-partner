import { Router } from 'express';
import authMiddleware from '../middleware/authMiddlewares.js';
const router: Router = Router();
import { getDashboardData } from '../controllers/admin-dashboard.controller.js';

// Get dashboard data
router.get('/dashboard', authMiddleware, getDashboardData);

export default router; 