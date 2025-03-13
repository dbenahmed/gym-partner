import express from 'express'; 


const authRouter = express.Router();
app.use(express.json());

import {registerUser,loginUser} from '../controllers/authControllers'





// Registration
authRouter.route('/register').post(registerUser);

// Login
authRouter.route('/login').get(loginUser);



























// Define your routes here

module.exports = router;