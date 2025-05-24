import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import authRouter from "./routes/authRoutes.js"
import workoutPlansRouter from "./routes/workoutPlansRoutes.js";
import workoutTemplatesRouter from './routes/workoutTemplatesRoutes.js';
import workoutSessionsRouter from './routes/workoutSessionsRoutes.js';
import workoutHistoryRouter from './routes/workoutHistoryRoutes.js';
import weightTrackingRouter from './routes/weightTrackingRoutes.js';
import nutritionGoalsRouter from './routes/nutritionGoalsRoutes.js';
import mealDatabaseRouter from './routes/mealDatabaseRoutes.js';
import mealVotingRouter from './routes/mealVotingRoutes.js';
import foodTrackingRouter from './routes/foodTrackingRoutes.js';
import exerciseDatabaseRouter from './routes/exerciseDatabaseRoutes.js';
import dashboardRouter from './routes/dashboardRoutes.js';
import customFoodTrackingRouter from './routes/customFoodTrackingRoutes.js';
import adminDashboardRouter from './routes/adminDashboardRoutes.js';



dotenv.config();


const isLocal = process.argv.includes('--local');


const app = express()
const port = process.env.PORT || 3000

// Middleware
app.use(express.json())


if (isLocal) {
    app.use(cors({
        origin: process.env.ALLOWED_ORIGINS || 'http://localhost:8081', //whatever your default is,
        credentials: true,  // Allow credentials (cookies, authorization headers)
    }))
} else {
    app.use(cors({
        credentials: true,  // Allow credentials (cookies, authorization headers)
    }))
}
app.use(cookieParser())


app.use(authRouter);
app.use(workoutPlansRouter)
app.use(workoutTemplatesRouter);
app.use(workoutSessionsRouter);
app.use(workoutHistoryRouter);
app.use(weightTrackingRouter);
app.use(nutritionGoalsRouter);
app.use(mealDatabaseRouter);
app.use(mealVotingRouter);
app.use(foodTrackingRouter);
app.use(exerciseDatabaseRouter);
app.use(dashboardRouter);
app.use(customFoodTrackingRouter);
app.use(adminDashboardRouter);

app.get('/', async (req, res) => {


    res.send('server is running')
})

app.listen(port, async () => {
    console.log(`server started at http://localhost:${port}`);


    if (isLocal) {
        const serveonet = require('serveonet');

        serveonet({
            localHost: "localhost",
            localPort: port,
            // Note that for request particular subdomain you need to register in first connection.
            remoteSubdomain: "gympartner",
            remotePort: 80,
            serverAliveInterval: 10, // after 10 seconds I send you a verification
            serverAliveCountMax: 1, // if I did not respond for 1 time, I will close the connection
        })
            .on("connect", (connection) => {
                console.log(
                    "Forwarding to localhost:" + connection.localPort,
                    "ssh pid: " + connection.pid
                );
            })
            .on("data", (data) => {
                console.log(data);
            })
            .on("timeout", (connection) => {
                console.log("Connection to " + connection.host + " timed out.");
            })
            .on("error", (event) => {
                console.error(event.message);
            })
            .on("close", (event) => {
                console.error("SSH exited with code " + event.code);
                event.onrestart = () => console.info("Restarted");
            });
    }
})

export default app;
