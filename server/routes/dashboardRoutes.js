import express from 'express';
const router = express.Router();
const { getDashboardData } = require('../controllers/dashboardControllers.js');

// Get dashboard data
router.get('/dashboard', getDashboardData);

export default router; 