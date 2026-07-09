import { Router } from 'express';
import authMiddleware from '@/core/middlewares/authMiddlewares.js';
const router: Router = Router();
import { getDashboardData } from '@/modules/admin-dashboard/controllers/admin-dashboard.controller.js';

// Get dashboard data
router.get('/dashboard', authMiddleware, getDashboardData);

export default router; 
