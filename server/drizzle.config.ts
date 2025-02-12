import 'dotenv/config';
import {defineConfig} from 'drizzle-kit';

export default defineConfig({
   out: './drizzle',
   schema: './db/schemas/**/*.js',
   dialect: 'postgresql',
   dbCredentials: {
      url: process.env.DATABASE_URL!,
   },
});
