// POSTGRESQL CONNECTION
import { drizzle } from 'drizzle-orm/node-postgres';
import { config } from "../config/env.js"


const db = drizzle(config.databaseUrl, { logger: true })

export default db
