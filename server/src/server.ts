import app from "@/app.js";
import { config } from "@/config/env.js";

const port = config.port || 80;

app.listen(port, "0.0.0.0", async () => {
  console.log(
    `server started at http://[IP_ADDRESS]:${port} environment: ${config.nodeEnv}`
  );
});
