import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import collectionsRouter from "./routes/gymTracking/collectionsRoutes.js";

dotenv.config();


const app = express()
const port = process.env.PORT || 3000

// Middleware
app.use(express.json())
app.use(cors())
app.use(cookieParser())


app.use(collectionsRouter)

app.get('/', async (req, res) => {


    res.send('server is running')
})

app.listen(port, async () => {
    console.log(`server started port http://localhost:${port}`);
})


export default app;
