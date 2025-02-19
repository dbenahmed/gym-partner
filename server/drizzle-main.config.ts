import 'dotenv/config';
import {defineConfig} from 'drizzle-kit';

export default defineConfig({
   out: './drizzle/main',
   schema: './db/schemas/main/**/*.js',
   dialect: 'postgresql',
   dbCredentials: {
      url: process.env.PSQL_DATABASE_URL!,
   },
});
