import app from "@/app.js";
import OS from "os";
import { config } from "@/config/env.js";

const isLocal = process.argv.includes("--local");
const port = config.port || 80;

if (isLocal) {
  console.log("starting server in local mode");
  app.listen(port, async () => {
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
