import app from "@/app.js";
import OS from "os";
import { config } from "@/config/env.js";

const port = config.port || 80;

app.listen(port, "0.0.0.0", async () => {
  const localIp = OS.networkInterfaces()["Wi-Fi"]![1].address;
  console.log(
    `server started at http://${localIp}:${port} environment: ${config.nodeEnv}`
  );
});
