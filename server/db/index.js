// POSTGRESQL CONNECTION
import { drizzle } from 'drizzle-orm/node-postgres';
import { config } from "../config/env.ts"
import * as schemas from "./schemas/schema.ts"
import * as relations from "./schemas/relations.ts"



const db = drizzle(config.databaseUrl, {
    schema: {
        ...schemas,
        ...relations
    }, logger: true
})

export default db
