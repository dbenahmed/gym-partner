import express from 'express'; 


const authRouter = express.Router();
app.use(express.json());

import {registerUser} from '../controllers/authControllers'





// Registration
authRouter.route('/register').get(registerUser);

// Login
authRouter.route('/login').get(loginUser);

// Logout 
// there is more talk about it 
authRouter.post('/logout', protect, logoutUser);



























// Define your routes here

module.exports = router;