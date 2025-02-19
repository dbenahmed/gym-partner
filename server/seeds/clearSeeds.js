import db from "../db/index.js";
import {seed, reset} from "drizzle-seed";
import * as devSchemas from "../db/schemas/dev/schema.js";
import * as mainSchemas from "../db/schemas/main/schema.js";
import dotenv from "dotenv";

dotenv.config();

const args = process.argv.slice(2); // Get CLI arguments
args.forEach(async (arg) => {
    const [key, value] = arg.split('=');
    if (key === "--schema")
        if (value === 'dev') {
            await reset(db, devSchemas)
        } else if (value === 'main') {
            await reset(db, mainSchemas)

        }
});

console.log("reset finished")
