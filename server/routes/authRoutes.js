import express from 'express'; 
import {registerUser,loginUser,getUserProfile,updateUserProfile,logoutUser} from '../controllers/authControllers.js'


const authRouter = express.Router();







// Registration
authRouter.route('/register').post(registerUser);

// Login
authRouter.route('/login').post(loginUser);

// Get the authenticated user's profile data
authRouter.get('/me', getUserProfile);

// Update the authenticated user's profile
authRouter.put('/me', updateUserProfile);

// Log out the user
authRouter.post('/logout', logoutUser);


export default authRouter