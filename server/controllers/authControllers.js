<<<<<<< HEAD
  import jwt from "jsonwebtoken";
  import bcrypt from "bcrypt";
  import { users } from '../db/schemas/main/schema.js';
  import {eq} from 'drizzle-orm';
  import db from "../../db/index.js";
  import dotenv from "dotenv"


  dotenv.config();



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
          res.cookies("token",token, {
          httpOnly: true,          // Prevents XSS attacks
          // secure: process.env.NODE_ENV === "production", // Ensures it's HTTPS in production
          // sameSite: "Strict",      // Prevents CSRF attacks
          // maxAge: 60 * 60 * 1000   // Token expires in 1 hour (60 minutes * 60 seconds * 1000 ms)
        })
          
          res.status(200).json({
              success:true,
              message:"the login is complete successfuly",
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

=======
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { users } from '../db/schemas/dev/schema.js';
import { eq } from 'drizzle-orm';
import db from "../db/index.js";
import dotenv from "dotenv"


dotenv.config();



//the registration controller 
export const registerUser = async (req, res) => {
  const { username, password } = req.body;
  // checkinng if the user is already exist
  const existUser = await db.select().from(users).where(eq(users.username, username)).limit(1);
  if (existUser.length > 0) {
    res.status(400).json({
      success: false,
      message: "the username already exists "
    })
  }

  // Insert the new user 
  try {
    const saltRounds = process.env.SALT_ROUNDS || 5;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    await db.insert(users).values({
      username: username,
      password: hashedPassword,
      salt: "nosaltcurrently"
    })
    res.status(201).send({
      success: true,
      message: "the registration is complete successfully"
    })
  }
  catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    })
  }


}




//THE LOGIN CONTROLLER 

export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    //checking if the user is exist
    const existUser = await db.select().from(users).where(eq(users.username, username)).limit(1);
    if (existUser.length === 0) {
      res.status(401).json({
        success: false,
        message: "the username is not valide "
      })
    }

    const user = existUser[0];
    // compare if the password is correct 

    const passwdCorrect = await bcrypt.compare(password, user.password);
    if (!passwdCorrect) {
      res.status(401).json({
        success: false,
        message: "the username or password is not correct !"
      })
    } else {

      // Genetrate JWT Token for the authentification
      const token = jwt.sign(
        {
          id: user.id,
        }
        , process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
      )
      res.cookie("accesstoken", token, {
        httpOnly: true,          // Prevents XSS attacks
        secure: process.env.NODE_ENV === "production" || false // Ensures it's HTTPS in production
        // sameSite: "Strict",      // Prevents CSRF attacks
        // maxAge: 60 * 60 * 1000   // Token expires in 1 hour (60 minutes * 60 seconds * 1000 ms)
      })
      res.status(200).json({
        success: true,
        message: "the login is complete successfuly",
        data: {
          id: user.id
        }
      })
    }

  }
  catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
}



// Get the authenticated user's profile data
export const getUserProfile = async (req, res) => {
  try {
    const userId = req.user;

    const foundUsers = await db.select().from(users).where(
      eq(users.id, userId)
    ).limit(1)

    if (foundUsers.length === 0) {
      res.status(409).json({
        success: false,
        message: 'The accesstoken has invalid userId!'
      })
    }
    const user = foundUsers[0]
    console.log(user)
    res.status(200).json({
      success: true,
      message: 'Data retrieved successfully',
      data: {
        id: user.id,
        username: user.username,
        avatar: user.avatar,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname
      }
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error retrieving user profile', error: error.message });
  }
};

// Update the authenticated user's profile
export const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user;
    const {
      username,
      avatar,
      email,
      firstname,
      lastname
    } = req.body

    const body = {
      username,
      avatar,
      email,
      firstname,
      lastname
    }

    const newData = Object.fromEntries(Object.entries(body).filter((v, i) => v[1] !== null))

    const updated = await db.update(users).set(newData).where(eq(users.id, userId))

    res.json({
      success: true,
      message: 'User`s data updated successfully'
    })
    // ... existing code ...
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error updating user profile', error: error.message });
  }
};

// Log out the user  ماتخدمهاش مانحتاجوهاش
export const logoutUser = (req, res) => {
  try {
    const { userId } = req.user;
    // ... existing code ...
  } catch (error) {
    res.status(500).json({ message: 'Error updating user profile', error: error.message });
  }
};
>>>>>>> 4387c64987cf4b92dc58458823fa2e0329ece5b8


