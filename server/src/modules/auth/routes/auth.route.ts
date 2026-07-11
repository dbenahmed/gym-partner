import { Router } from 'express';
import { registerUser, loginUser, getUserProfile, updateUserProfile, logoutUser, checkAuth } from '@/modules/auth/controllers/auth.controller.js';
import authMiddleware from '@/core/middlewares/authMiddlewares.js';

const router: Router = Router();

// Registration
router.route('/auth/register').post(registerUser);

// Login
router.route('/auth/login').post(loginUser);

// Get the authenticated user's profile data
router.get('/auth/me', authMiddleware, getUserProfile);

// Update the authenticated user's profile
router.put('/auth/me', authMiddleware, updateUserProfile);

// Log out the user
router.post('/auth/logout', authMiddleware, logoutUser);

// Check the authentication
router.get('/auth/check', authMiddleware, checkAuth);

export default router;
