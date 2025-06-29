import db from "../db/index.js";
import { collections, exercises, plans, users } from "../db/schemas/schema.js";
import { and, eq, ilike, like, inArray, sql } from "drizzle-orm";
// Get a list of all available exercises
export const getAllExercises = async (req, res) => {
    try {
        const userId = req.user;
        const userData = req.userData;
        const queries = {
            "name": req.query.name,
            "force": req.query.force,
            "level": req.query.level,
            "mechanic": req.query.mechanic,
            "equipment": req.query.equipment,
            "primarymuscles": req.query.primarymuscle,
            "secondarymuscles": req.query.secondarymuscle,
            "category": req.query.category,
        };
        const { page } = req.query;
        const limit = (req.query.limit) ? parseInt(req.query.limit) : 10;
        const filteredQueries = Object.fromEntries(Object.entries(queries).filter((v, i) => v[1] !== "" && v[1] !== undefined && v[1] !== null));
        if (Object.keys(filteredQueries).length === 0) {
            res.status(400).json({
                success: false,
                message: "No valid filters provided"
            });
            return;
        }
        console.log("Filtered Queries: ", filteredQueries);
        const arrayFields = ['primarymuscles', 'secondarymuscles'];
        const andConditions = Object.entries(filteredQueries).map(([key, value]) => {
            console.log('Key:', key, 'Value:', value, 'Type:', Array.isArray(value) ? 'array' : typeof value);
            // Handle name field with ilike
            if (key === 'name') {
                if (typeof value !== 'string') {
                    console.warn(`Invalid value for name: ${value}, expected string`);
                    return null;
                }
                return ilike(exercises[key], `%${value.trim()}%`);
            }
            // Handle array fields
            if (arrayFields.includes(key)) {
                if (typeof value === 'string') {
                    // Use raw SQL for array overlap
                    return sql `${exercises[key]} && ARRAY[${value}]::text[]`;
                }
                else if (Array.isArray(value)) {
                    return sql `${exercises[key]} && ARRAY[${value.join(',')}]::text[]`;
                }
                else {
                    console.warn(`Invalid value for ${key}: ${value}, expected string or array`);
                    return null;
                }
            }
            // Handle scalar fields
            if (typeof value === 'string' || typeof value === 'number') {
                return eq(exercises[key], value);
            }
            else {
                console.warn(`Invalid value for ${key}: ${value}, expected string or number`);
                return null;
            }
        }).filter(condition => condition !== null); // Remove null conditions
        console.log('andConditions:', andConditions);
        const foundExercises = await db.select().from(exercises).where(andConditions.length > 0 ? and(...andConditions) : undefined).limit(limit).offset(page * limit);
        const count = await db.$count(exercises, andConditions.length > 0 ? and(...andConditions) : undefined);
        res.status(200).json({
            success: true, data: {
                count,
                exercises: foundExercises
            }
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error retrieving all exercises', error: error.message });
    }
};
// Get details for a specific exercise
export const getExerciseDetails = async (req, res) => {
    try {
        const userId = req.user;
        const { exerciseId } = req.params;
        const foundExercise = await db.select().from(exercises).where(eq(exercises.id, exerciseId)).limit(1);
        if (!foundExercise || foundExercise.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Exercise Not Found'
            });
        }
        return res.status(200).json({
            success: true,
            data: foundExercise[0]
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Error retrieving exercise details', error: error.message });
    }
};
// Create a new exercise inside exercises database
export const createNewExercise = (req, res) => {
    try {
        const userId = req.user;
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating a new exercise', error: error.message });
    }
};
// Update an existing exercise
export const updateExercise = (req, res) => {
    try {
        const userId = req.user;
        const { exerciseId } = req.params;
        const updatedData = req.body;
        res.status(200).json({ message: 'Exercise updated successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating exercise', error: error.message });
    }
};
// Delete an existing exercise
export const deleteExercise = (req, res) => {
    try {
        const userId = req.user;
        const { exerciseId } = req.params;
        res.status(200).json({ message: 'Exercise deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting exercise', error: error.message });
    }
};
