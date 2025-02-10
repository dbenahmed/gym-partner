const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")
require('dotenv').config()

const app = express()

// Middleware
app.use(express.json())
app.use(cors())
app.use(cookieParser())


app.get((req, res) => {
    res.send('server is running')
})



module.exports = app