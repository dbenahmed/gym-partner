import express from 'express';
import authMiddleware from '../middleware/authMiddlewares.js';
const router = express.Router();
const { getDashboardData } = require('../controllers/dashboardControllers.js');

// Get dashboard data
router.get('/dashboard', authMiddleware, getDashboardData);

export default router; 