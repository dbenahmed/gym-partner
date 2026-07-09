import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "@/modules/auth/routes/auth.route.js";
import workoutRoutinesRouter from "@/modules/workout-routines/routes/workout-routines.route.js";
import workoutTemplatesRouter from "@/modules/workout-templates/routes/workout-templates.route.js";
import workoutSessionsRouter from "@/modules/workout-sessions/routes/workout-sessions.route.js";
import weightTrackingRouter from "@/modules/body-weight-tracking/routes/body-weight-tracking.route.js";
import nutritionGoalsRouter from "@/modules/nutrition-goals/routes/nutrition-goals.route.js";
import foodDatabaseRouter from "@/modules/food-database/routes/food-database.route.js";
import foodVotingRouter from "@/modules/food-voting/routes/food-voting.route.js";
import foodTrackingRouter from "@/modules/food-tracking/routes/food-tracking.route.js";
import exerciseDatabaseRouter from "@/modules/exercise-search/routes/exercise-search.route.js";
import exerciseManagementRouter from "@/modules/exercise-management/routes/exercise-management.route.js";
import dashboardRouter from "@/modules/dashboard/routes/dashboard.route.js";
import customFoodTrackingRouter from "@/modules/custom-food-tracking/routes/custom-food-tracking.route.js";
import adminDashboardRouter from "@/modules/admin-dashboard/routes/admin-dashboard.route.js";
//import serveonet from 'serveonet';
import { config } from "@/config/env.js";
import errorHandler from "@/core/middlewares/error.middleware.js";

const app = express();

// Middleware
app.use(express.json());

app.use(
  cors({
    origin: config.allowedOrigins || "http://localhost:8081",
    credentials: true, // Allow credentials (cookies, authorization headers)
  })
);

app.use(cookieParser());

app.use(authRouter);
app.use(workoutRoutinesRouter);
app.use(workoutTemplatesRouter);
app.use(workoutSessionsRouter);
app.use(weightTrackingRouter);
app.use(nutritionGoalsRouter);
app.use(foodDatabaseRouter);
app.use(foodVotingRouter);
app.use(foodTrackingRouter);
app.use(exerciseDatabaseRouter);
app.use(exerciseManagementRouter);
app.use(dashboardRouter);
app.use(customFoodTrackingRouter);
app.use(adminDashboardRouter);
app.use(errorHandler);

app.get("/", async (req, res) => {
  res.send("server is running");
});

export default app;
