import express from 'express'; 
import {registerUser,loginUser,getUserProfile,updateUserProfile,logoutUser} from '../controllers/authControllers.js'
import authMiddleware from '../middleware/authMiddlewares.js';


const router = express.Router();







// Registration
router.route('/register').post(registerUser);

// Login
router.route('/login').post(loginUser);

// Get the authenticated user's profile data
router.get('/me', authMiddleware, getUserProfile);

// Update the authenticated user's profile
router.put('/me', authMiddleware, updateUserProfile);

// Log out the user
router.post('/logout', authMiddleware, logoutUser);


export default router