import { config } from "./src/config/env.js";

const migrationOutput = config.nodeEnv === "development" ? "/dev" : "/main";

export default {
  out: `./drizzle/${migrationOutput}`,
  schema: "./db/schemas/**/*[.js,.ts]",
  dialect: "postgresql",
  dbCredentials: {
    url: config.databaseUrl!,
  },
};
