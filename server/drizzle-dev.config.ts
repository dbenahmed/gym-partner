import { defineConfig } from "drizzle-kit";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  out: "./drizzle/dev",
  schema: "./db/schemas/**/*[.js,.ts]",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  //schemaFilter: ["dev"],
  verbose: true,
});
