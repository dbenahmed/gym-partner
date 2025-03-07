// POSTGRESQL CONNECTION
import {drizzle} from 'drizzle-orm/node-postgres';
import dotenv from 'dotenv';

dotenv.config();

const db = drizzle(process.env.SUPABASE_DATABASE_URL)

export default db
