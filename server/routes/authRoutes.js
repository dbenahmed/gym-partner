import express from 'express'; 
import {registerUser,loginUser,getUserProfile,updateUserProfile,logoutUser} from '../controllers/authControllers.js'


const router = express.Router();







// Registration
router.route('/register').post(registerUser);

// Login
router.route('/login').post(loginUser);

// Get the authenticated user's profile data
router.get('/me', getUserProfile);

// Update the authenticated user's profile
router.put('/me', updateUserProfile);

// Log out the user
router.post('/logout', logoutUser);


export default router