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


const app = express()
const port = process.env.PORT || 3000

// Middleware
app.use(express.json())
app.use(cors())
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
    console.log(`server started port http://localhost:${port}`);
})


export default app;
