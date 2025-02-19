/*const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const db = require("./db/index.js");
const dotenv = require('dotenv');
const {usersTable} = require("./db/schemas/userSchema");
dotenv.config();*/
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import db from "./db/index.js";

dotenv.config();


const app = express()
const port = process.env.PORT || 3000

// Middleware
app.use(express.json())
app.use(cors())
app.use(cookieParser())


app.get('/', async (req, res) => {


    res.send('server is running')
})

app.listen(port, async () => {
    console.log('server started port ', port);
})


export default app;
