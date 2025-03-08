import express from 'express'; 
import supabase from '../config/supabaseClient.js';
import app from '../app.js';
const router = express.Router();
app.use(express.json());


import { users } from '../db/schemas/dev/schema.js';


app.get('/:id', async (req,res)=>{
   const Wanted = users.find(use => use.id == id );
   res.send(Wanted.email);
})











app.get('/login', async (req, res) => {
    const {email , password } = req.body;
    const { data, error } = await supabase.auth.signIn({
        email,
        password
    })
})  



























// Define your routes here

module.exports = router;