import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { users } from '../db/schemas/main/schema.js';
import {eq} from 'drizzle-orm';
import db from "../../db/index.js";



//the registration controller 
export const registerUser = async (req,res) =>  {
    const {username, password } = req.body;
    // checkinng if the user is already exist
 const existUser  = await db.select().from(users).where(eq(users.username,username)).limit(1);
 if (existUser.length > 0 ){ 
    res.status(409).json({
    success:false,
    message : "the username is not valide "
 })}else{
    // Insert the new user 
   try{
    const hashedPassword = await bcrypt.hash(password,10);
 await db.insert(users).values({
    username : username,
    password : hashedPassword
})
res.status(201).send("the registration is complete successfully")
}
catch(err){
res.status(500).json({
    success:false,
    message : err.message,
})
}

}}




//THE LOGIN CONTROLLER 

export  const loginUser = async (req,res) =>{
try {  
         const {username,password} = req.body;
       //checking if the user is exist
       const existUser  = await db.select().from(users).where(eq(users.username,username)).limit(1);
       if (existUser.length === 0 ){ 
          res.status(401).json({
          success:false,
          message : "the username is not valide "
       })}else{
         const  user = existUser[0];
          // compare if the password is correct 
          
          const passwdCorrect = await bcrypt.compare(password,user.password);
          if (!passwdCorrect) {
            res.status(401).json({
            success:false,
            message:"the username or password is not correct !"
          })} else {
            
          // Genetrate JWT Token for the authentification
          const token = jwt.sign(
            {
            id: user.id ,
          username : user.username,
        }
          ,process.env.SECRET_KEY,
          {expiresIn:"30s"}
        )
        res.status(200).json({
            success:true,
            message:"the login is complete successfuly",
            token : token, 
            username:user.username,
            id :user.id
        })
    }}}
        catch (err){
         res.status(401).json({
            success : false,
            message : err.message
         })
        }
          





    } 



