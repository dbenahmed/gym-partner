// POSTGRESQL CONNECTION
import { drizzle } from 'drizzle-orm/node-postgres';
import dotenv from 'dotenv';
import * as devSchema from "./schemas/dev/schema.js"
import * as devRelations from "./schemas/dev/relations.js"
dotenv.config();


const db = drizzle(process.env.SUPABASE_DATABASE_URL, { schema: { ...devSchema, ...devRelations }, logger: true })

export default db
