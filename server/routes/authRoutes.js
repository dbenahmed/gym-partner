<<<<<<< HEAD
import express from 'express'; 
import {registerUser,loginUser} from '../controllers/authControllers.js'


const authRouter = express.Router();
=======
import express from 'express';
import { registerUser, loginUser, getUserProfile, updateUserProfile, logoutUser } from '../controllers/authControllers.js'
import authMiddleware from '../middleware/authMiddlewares.js';


const router = express.Router();
>>>>>>> 4387c64987cf4b92dc58458823fa2e0329ece5b8







// Registration
<<<<<<< HEAD
authRouter.route('/register').post(registerUser);

// Login
authRouter.route('/login').post(loginUser);


export default authRouter
=======
router.route('/auth/register').post(registerUser);

// Login
router.route('/auth/login').post(loginUser);

// Get the authenticated user's profile data
router.get('/auth/me', authMiddleware, getUserProfile);

// Update the authenticated user's profile
router.put('/auth/me', authMiddleware, updateUserProfile);

// Log out the user
router.post('/auth/logout', authMiddleware, logoutUser);


export default router
>>>>>>> 4387c64987cf4b92dc58458823fa2e0329ece5b8
