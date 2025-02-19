// POSTGRESQL CONNECTION
import {drizzle} from 'drizzle-orm/node-postgres';
import dotenv from 'dotenv';
import config from "../config.js";

dotenv.config();

const db = drizzle(config.psqlDatabaseUrl)

export default db

/*
    // NEON CONNECTION CANCELLED
    import {neon} from '@neondatabase/serverless';
    import {drizzle} from 'drizzle-orm/neon-http';
    import dotenv from 'dotenv';

    dotenv.config();

    const sql = neon(config.neonDatabaseUrl);
    const db = drizzle(sql);

    export default db;
*/
