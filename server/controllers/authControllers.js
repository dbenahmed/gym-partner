import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { users } from '../db/schemas/main/schema';
import {eq} from 'drizzle-orm'



export const registerUser = (req,res) =>  {
    res.send("welcome on the login page !")
    
};

export const foundUser = await db.select