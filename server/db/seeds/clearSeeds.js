console.log('here')
import db from "../index.js";
import { reset } from "drizzle-seed";
import * as devSchemas from "../schemas/dev/schema.js";
import * as mainSchemas from "../schemas/main/schema.js";
import dotenv from "dotenv";

dotenv.config();

const args = process.argv.slice(2); // Get CLI arguments
args.forEach(async (arg) => {
    const [key, value] = arg.split('=');
    if (key === "--schema") {
        if (value === 'dev') {
            console.log('here')
            await reset(db, devSchemas)
        } else if (value === 'main') {
            await reset(db, mainSchemas)
        }
    }
});

console.log("reset finished")
