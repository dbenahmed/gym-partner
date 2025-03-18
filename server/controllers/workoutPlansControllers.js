// Get a list of all workout collections for the user
import db from "../db/index.js";
import {plans} from "../db/schemas/dev/schema.js";
import {eq} from "drizzle-orm";

export const getWorkoutCollections = (req, res) => {
};

// Create a new workout collection
export const createWorkoutCollection = (req, res) => {
};

// Update a collection's name
export const updateWorkoutCollection = (req, res) => {
};

// Delete a collection
export const deleteWorkoutCollection = (req, res) => {
};

// Get a list of all workout plans across collections
export const getWorkoutPlans = async (req, res) => {
    const {collectionId} = req.body
    console.log(collectionId)

    const foundPlans = await db.select({
        id: plans.id,
        title: plans.title,
        collectionId: plans.collectionId
    }).from(plans).where(eq(plans.collectionId, collectionId))

    console.log(foundPlans)
    res.send('done')
};

// Create a new workout plan inside a collection
export const createWorkoutPlan = (req, res) => {
};

// Get details of a specific workout plan
export const getWorkoutPlanDetails = (req, res) => {
};

// Update a workout plan's name or collection
export const updateWorkoutPlan = (req, res) => {
};

// Delete a workout plan
export const deleteWorkoutPlan = (req, res) => {
};

// Add an exercise to a workout plan
export const addExerciseToPlan = (req, res) => {
};

// Update an exercise in a workout plan
export const updateExerciseInPlan = (req, res) => {
};

// Remove an exercise from a workout plan
export const removeExerciseFromPlan = (req, res) => {
};