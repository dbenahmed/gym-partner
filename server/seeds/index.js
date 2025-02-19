import bcrypt from "bcrypt";
import dotenv from "dotenv";
import db from "../db/index.js";
import {reset} from "drizzle-seed";
import * as devSchemas from "../db/schemas/dev/schema.js";
import * as mainSchemas from "../db/schemas/main/schema.js";

dotenv.config();

let schema;
const args = process.argv.slice(2); // Get CLI arguments
args.forEach(async (arg) => {
    const [key, value] = arg.split('=');
    if (key === "--schema")
        if (value === 'dev') {
            schema = devSchemas
        } else if (value === 'main') {
            schema = mainSchemas
        }
});

const main = async () => {
    await db.transaction(async (tx) => {
        try {
            // filling the exercises db
            console.log('here 1')
            const exercisesMock = await Promise.all(
                Array.from({length: 10}, async (_, index) => {
                    try {
                        return ({
                            name: `Exercise ${index + 1}`,
                            force: index % 2 === 0 ? 'push' : 'pull', // Alternating between 'push' and 'pull'
                            level: index % 3 === 0 ? 'beginner' : index % 3 === 1 ? 'intermediate' : 'expert', // Cycling through levels
                            mechanic: index % 2 === 0 ? 'compound' : 'isolation', // Alternating between compound and isolation
                            equipment: index % 3 === 0 ? 'dumbbell' : index % 3 === 1 ? 'kettlebells' : 'body only', // Alternating equipment
                            primarymuscles: ['chest', 'shoulders'], // Example muscles
                            secondarymuscles: ['triceps', 'back'], // Example secondary muscles
                            instructions: ['Step 1: Do this', 'Step 2: Do that'], // Example instructions
                            category: index % 2 === 0 ? 'strength' : 'cardio', // Alternating categories
                            images: [`https://via.placeholder.com/150?text=Exercise${index + 1}`], // Placeholder image
                            creationdate: new Date().toISOString(),
                            updationdate: new Date().toISOString(),
                        })
                    } catch (e) {
                        console.error(e);
                    }
                }))
            const insertedExercises = await tx.insert(schema.exercises).values(exercisesMock).returning();
            console.log(insertedExercises)

            // filling the users
            const usersMock = await Promise.all(Array.from({length: 10}, async (_, index) => {
                try {
                    const password = await bcrypt.hash(`password${index + 1}`, parseInt(process.env.BCRYPT_SALT_ROUNDS))
                    return ({
                        username: `user${index + 1}`,
                        password, // Mock password (store hashed in production)
                        salt: `salt${index + 1}`,
                        refreshtoken: `refreshtoken${index + 1}`,
                        avatar: `https://randomuser.me/api/portraits/men/${index + 1}.jpg`, // Random avatar
                        email: `user${index + 1}@example.com`, // Mock email
                        firstname: `First${index + 1}`,
                        lastname: `Last${index + 1}`,
                    })
                } catch (e) {
                    console.error(e);
                }
            }))
            const insertedUsers = await tx.insert(schema.users).values(usersMock).returning();
            // filling the food db
            const foodMock = await Promise.all(Array.from({length: 10}, async (_, index) => {
                try {
                    const userId = insertedUsers[index % insertedUsers.length]?.id; // Random user from the array
                    return {
                        foodname: `Food Item ${index + 1}`,
                        description: `This is a description for food item ${index + 1}`,
                        calories: 100 + index * 10,
                        proteinper100G: 5 + index,
                        carbohydratesper100G: 20 + index * 2,
                        fatper100G: 3 + index,
                        saturatedfatper100G: 1 + index,
                        transfat: 0 + index,
                        fiber: 1 + index,
                        sugar: 5 + index * 2,
                        sodium: 50 + index * 5,
                        cholesterol: 30 + index,
                        brand: `Brand ${index + 1}`,
                        custom: index % 2 === 0,
                        createdBy: userId,
                        creationdate: new Date().toISOString(),
                        updationdate: new Date().toISOString(),
                    };
                } catch (e) {
                    console.error(e);
                }
            }))
            const insertedFood = await tx.insert(schema.foods).values(foodMock).returning();
            // creating the collections
            const collectionsMock = await Promise.all(Array.from({length: 10}, async (_, index) => {
                try {
                    const userId = insertedUsers[index % insertedUsers.length]?.id; // Random user from the array
                    return {
                        userId: userId,
                        title: `Collection Title ${index + 1}`,
                        description: `This is a description for collection ${index + 1}`,
                        creationdate: new Date().toISOString(),
                        updationdate: new Date().toISOString(),
                    };
                } catch (e) {
                    console.error(e);
                }
            }));
            const insertedCollections = await tx.insert(schema.collections).values(collectionsMock).returning();

            // creating the plans
            const plansMock = await Promise.all(Array.from({length: 10}, async (_, index) => {
                try {
                    const collectionId = insertedCollections[index % insertedCollections.length]?.id; // Random collection from the array
                    return {
                        collectionId: collectionId,
                        title: `Plan Title ${index + 1}`,
                        creationdate: new Date().toISOString(),
                        updationdate: new Date().toISOString(),
                    };
                } catch (e) {
                    console.error(e);
                }
            }));
            const insertedPlans = await tx.insert(schema.plans).values(plansMock).returning();

            // creating exercises for each plan from the exercises db
            const plansExercisesMock = await Promise.all(Array.from({length: 10}, async (_, index) => {
                try {
                    const planId = insertedPlans[index % insertedPlans.length]?.id; // Random plan from the array
                    const exerciseId = insertedExercises[index % insertedExercises.length]?.id; // Random exercise from the array
                    return {
                        planId: planId,
                        exerciseId: exerciseId,
                        order: index + 1, // Assuming the order is just the index for simplicity
                        creationdate: new Date().toISOString(),
                        updationdate: new Date().toISOString(),
                    };
                } catch (e) {
                    console.error(e);
                }
            }));
            const insertedPlansExercises = await tx.insert(schema.plansExercises).values(plansExercisesMock).returning();

            // inserting sessions from plans
            const sessionsMock = await Promise.all(Array.from({length: 10}, async (_, index) => {
                try {
                    const userId = insertedUsers[index % insertedUsers.length]?.id; // Random user from the array
                    return {
                        planId: null, // Since the planId is undefined as per your request
                        duedate: new Date().toISOString(),
                        name: `Session ${index + 1}`,
                        starttime: new Date().toISOString(),
                        endtime: new Date(new Date().getTime() + 60 * 60 * 1000).toISOString(), // 1 hour later
                        note: `This is a note for session ${index + 1}`,
                        rating: Math.floor(Math.random() * 6), // Random rating between 0 and 5
                    };
                } catch (e) {
                    console.error(e);
                }
            }));
            const insertedSessions = await tx.insert(schema.sessions).values(sessionsMock).returning();

            // insert sessions_exercises
            const setsOfSessionsExercisesMock = await Promise.all(
                Array.from({length: 10}, async (_, index) => {
                    try {
                        const sessionId = insertedSessions[index % insertedSessions.length]?.id; // Random session
                        const exerciseId = insertedExercises[index % insertedExercises.length]?.id; // Random exercise

                        return {
                            sessionId,
                            exerciseId,
                            order: index + 1, // Set the order
                            weight: 20 + index * 5, // Example weight
                            unit: index % 2 === 0 ? 'kg' : 'lbs', // Random unit (kg or lbs)
                            reps: [10 + index % 5, 12 + index % 3, 8 + index % 4], // Example array of reps
                            creationdate: new Date().toISOString(), // Creation date
                        };
                    } catch (e) {
                        console.error(e);
                    }
                })
            );
            await tx.insert(schema.setsOfSessionsExercises).values(setsOfSessionsExercisesMock).returning();

            // todo inserting meals logs
            const mealsLogsMock = await Promise.all(
                Array.from({length: 10}, async (_, index) => {
                    try {
                        const userId = insertedUsers[index % insertedUsers.length]?.id; // Assign userId from existing users
                        const foodId = insertedFood[index % insertedFood.length]?.id; // Assign mealId from existing foods
                        return {
                            foodId,
                            userId,
                            creationdate: new Date().toISOString(),
                            updateddate: new Date().toISOString(),
                            description: `Meal log ${index + 1}`,
                            servingsizeG: 100 + index * 50, // Varying serving sizes
                        };
                    } catch (e) {
                        console.error(e);
                    }
                })
            );
            const insertedMealsLogs = await tx.insert(schema.mealsLogs).values(mealsLogsMock).returning();

            // todo inserting weights logs
            const weightsLogsMock = await Promise.all(
                Array.from({length: 10}, async (_, index) => {
                    try {
                        const userId = insertedUsers[index % insertedUsers.length]?.id; // Assign userId from existing users
                        return {
                            userId,
                            weight: 50 + index * 5, // Varying weights from 50kg onwards
                            creationdate: new Date().toISOString(),
                            updationdate: new Date().toISOString(),
                            unit: index % 2 === 0 ? "kg" : "lbs", // Alternating between kg and lbs
                        };
                    } catch (e) {
                        console.error(e);
                    }
                })
            );
            const insertedWeightsLogs = await tx.insert(schema.weightsLogs).values(weightsLogsMock).returning();

        } catch (e) {
            console.error(e);
            //tx.rollback()
        }
    })
}
await main()
console.log("seeding finished")
