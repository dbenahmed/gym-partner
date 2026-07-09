import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route.js";
import workoutPlansRouter from "./routes/workout-plans.route.js";
import workoutTemplatesRouter from "./routes/workout-templates.route.js";
import workoutSessionsRouter from "./routes/workout-sessions.route.js";
import workoutHistoryRouter from "./routes/workout-history.route.js";
import weightTrackingRouter from "./routes/weight-tracking.route.js";
import nutritionGoalsRouter from "./routes/nutrition-goals.route.js";
import mealDatabaseRouter from "./routes/meal-database.route.js";
import mealVotingRouter from "./routes/meal-voting.route.js";
import foodTrackingRouter from "./routes/food-tracking.route.js";
import exerciseDatabaseRouter from "./routes/exercise-search.route.js";
import exerciseManagementRouter from "./routes/exercise-management.route.js";
import dashboardRouter from "./routes/dashboard.route.js";
import customFoodTrackingRouter from "./routes/custom-food-tracking.route.js";
import adminDashboardRouter from "./routes/admin-dashboard.route.js";
//import serveonet from 'serveonet';
import OS from "os";
import { config } from "./config/env.js";
import errorHandler from "./middleware/error.middleware.js";

const isLocal = process.argv.includes("--local");
//const isServeonet = process.argv.includes('--serveonet');

const app = express();
const port = config.port || 80;

// Middleware
app.use(express.json());

if (isLocal) {
  app.use(
    cors({
      origin: config.allowedOrigins || "http://localhost:8081", //whatever your default is,
      credentials: true, // Allow credentials (cookies, authorization headers)
    })
  );
} else {
  app.use(
    cors({
      credentials: true, // Allow credentials (cookies, authorization headers)
    })
  );
}
app.use(cookieParser());

app.use(authRouter);
app.use(workoutPlansRouter);
app.use(workoutTemplatesRouter);
app.use(workoutSessionsRouter);
app.use(workoutHistoryRouter);
app.use(weightTrackingRouter);
app.use(nutritionGoalsRouter);
app.use(mealDatabaseRouter);
app.use(mealVotingRouter);
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
/* 
if (isServeonet) {
    app.listen(port, async () => {
        console.log(`server started at http://localhost:${port}`);
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
    })
} else  */
if (isLocal) {
  console.log("starting server in local mode");
  app.listen(port, async () => {
    // get the local IP address
    const localIp = OS.networkInterfaces()["Wi-Fi"]![1].address;
    console.log(
      `server started at http://${localIp}:${port} environment: ${config.nodeEnv}`
    );
  });
} else {
  console.log("starting server in production mode");
  app.listen(port, "0.0.0.0", async () => {
    console.log(`server started on port ${port}`);
  });
}

export default app;
