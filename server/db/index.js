// POSTGRESQL CONNECTION
import { drizzle } from 'drizzle-orm/node-postgres';
import dotenv from 'dotenv';
import * as schema from "./schemas/schema.js"
import * as relations from "./schemas/relations.js"

dotenv.config();



const db = drizzle(process.env.DATABASE_URL, { schema: { ...schema, ...relations }, logger: true })

export default db
