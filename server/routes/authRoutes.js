import express from 'express';
import { registerUser, loginUser, getUserProfile, updateUserProfile, logoutUser, checkAuth } from '../controllers/authControllers.ts'
import authMiddleware from '../middleware/authMiddlewares.ts';


const router = express.Router();







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

export default router