import express from 'express'; 
import {registerUser,loginUser} from '../controllers/authControllers.js'


const authRouter = express.Router();







// Registration
authRouter.route('/register').post(registerUser);

// Login
authRouter.route('/login').post(loginUser);


export default authRouter