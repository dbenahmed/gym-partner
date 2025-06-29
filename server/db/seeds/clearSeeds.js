import db from "../index.js";
import { reset } from "drizzle-seed";
import * as schema from "../schemas/schema.js";
import dotenv from "dotenv";

dotenv.config();


await reset(db, schema)




console.log("reset finished")
