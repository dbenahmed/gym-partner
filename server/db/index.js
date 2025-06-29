// POSTGRESQL CONNECTION
import { drizzle } from 'drizzle-orm/node-postgres';
import { config } from "../config/env.js"
import * as schema from "../db/schemas/schema.js"

const db = drizzle(config.databaseUrl, { schema, logger: true })

export default db
