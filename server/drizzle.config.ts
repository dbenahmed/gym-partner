import "dotenv/config";
import { defineConfig } from "drizzle-kit";

import { config } from "./config/env.js";

const migrationOutput = config.nodeEnv === "development" ? "/main" : "/dev";

export default defineConfig({
  out: `./drizzle/${migrationOutput}`,
  schema: "./db/schemas/**/*[.js,.ts]",
  dialect: "postgresql",
  dbCredentials: {
    url: config.databaseUrl!,
  },
});
