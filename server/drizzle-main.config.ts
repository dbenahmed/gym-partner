import "dotenv/config";
import { defineConfig } from "drizzle-kit";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  out: "./drizzle/main",
  schema: "./db/schemas/**/*[.js,.ts]",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.SUPABASE_DATABASE_URL!,
  },
  schemaFilter: ["main"],
});
