import 'dotenv/config';
import {defineConfig} from 'drizzle-kit';

export default defineConfig({
   out: './drizzle/dev',
   schema: './db/schemas/dev/**/*.js',
   dialect: 'postgresql',
   dbCredentials: {
      url: process.env.PSQL_DATABASE_URL!,
   },
});
