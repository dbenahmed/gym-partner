import {defineConfig} from 'drizzle-kit';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
   out: './drizzle/dev',
   schema: './db/schemas/dev/**/*[.js,.ts]',
   dialect: 'postgresql',
   dbCredentials: {
      url: process.env.SUPABASE_DATABASE_URL!,
   },
   schemaFilter: ["dev"],
   verbose: true
});
