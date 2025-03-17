const express = require('express');
const router = express.Router();
const { getDashboardData } = require('../controllers/dashboardControllers.js');

// Get dashboard data
router.get('/dashboard', getDashboardData);

module.exports = router; 