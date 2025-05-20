import dotenv from "dotenv";
import db from "../index.js";
import * as devSchemas from "../schemas/dev/schema.js";
import * as mainSchemas from "../schemas/main/schema.js";
import fs from 'fs/promises';

const exercisesData = JSON.parse(await fs.readFile(new URL('./data/exercises.json', import.meta.url)));
const foodsData = JSON.parse(await fs.readFile(new URL('./data/foods.json', import.meta.url)));



dotenv.config();

let schema;
const args = process.argv.slice(2); // Get CLI arguments
args.forEach(async (arg) => {
    const [key, value] = arg.split('=');
    if (key === "--schema") if (value === 'dev') {
        schema = devSchemas
    } else if (value === 'main') {
        schema = mainSchemas
    }
});

const main = async () => {
    await db.transaction(async (tx) => {
        try {
            // Seed exercises table
            const insertedExercises = await tx.insert(schema.exercises).values(exercisesData).returning();

            // Seed foods table
            const insertedFoods = await tx.insert(schema.foods).values(foodsData).returning();
            
            console.log(`Inserted ${insertedExercises.length} exercises`);
            console.log(`Inserted ${insertedFoods.length} foods`);

            console.log("Seeding finished");
        } catch (e) {
            console.error(e);
            await tx.rollback()
        }
    })
}
await main()

