// Get a list of all workout collections for the user
import db from "../db/index.js";
import {plans} from "../db/schemas/dev/schema.js";
import {eq} from "drizzle-orm";

export const getWorkoutCollections = (req, res) => {
  try {
    const { userId } = req.user;
    // ... existing code ...
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving workout collections', error: error.message });
  }
};

// Create a new workout collection
export const createWorkoutCollection = (req, res) => {
  try {
    const { userId } = req.user;
    // ... existing code ...
  } catch (error) {
    res.status(500).json({ message: 'Error creating workout collection', error: error.message });
  }
};

// Update a collection's name
export const updateWorkoutCollection = (req, res) => {
  try {
    const { userId } = req.user;
    // ... existing code ...
  } catch (error) {
    res.status(500).json({ message: 'Error updating workout collection', error: error.message });
  }
};

// Delete a collection
export const deleteWorkoutCollection = (req, res) => {
  try {
    const { userId } = req.user;
    // ... existing code ...
  } catch (error) {
    res.status(500).json({ message: 'Error deleting workout collection', error: error.message });
  }
};

// Get a list of all workout plans across collections
export const getWorkoutPlans = async (req, res) => {
  try {
    const { userId } = req.user;
    const {collectionId} = req.body;
    console.log(collectionId);

    const foundPlans = await db.select({
        id: plans.id,
        title: plans.title,
        collectionId: plans.collectionId
    }).from(plans).where(eq(plans.collectionId, collectionId));

    console.log(foundPlans);
    res.send('done');
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving workout plans', error: error.message });
  }
};

// Create a new workout plan inside a collection
export const createWorkoutPlan = (req, res) => {
  try {
    const { userId } = req.user;
    // ... existing code ...
  } catch (error) {
    res.status(500).json({ message: 'Error creating workout plan', error: error.message });
  }
};

// Get details of a specific workout plan
export const getWorkoutPlanDetails = (req, res) => {
  try {
    const { userId } = req.user;
    // ... existing code ...
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving workout plan details', error: error.message });
  }
};

// Update a workout plan's name or collection
export const updateWorkoutPlan = (req, res) => {
  try {
    const { userId } = req.user;
    // ... existing code ...
  } catch (error) {
    res.status(500).json({ message: 'Error updating workout plan', error: error.message });
  }
};

// Delete a workout plan
export const deleteWorkoutPlan = (req, res) => {
  try {
    const { userId } = req.user;
    // ... existing code ...
  } catch (error) {
    res.status(500).json({ message: 'Error deleting workout plan', error: error.message });
  }
};

// Add an exercise to a workout plan
export const addExerciseToPlan = (req, res) => {
  try {
    const { userId } = req.user;
    // ... existing code ...
  } catch (error) {
    res.status(500).json({ message: 'Error adding exercise to plan', error: error.message });
  }
};

// Update an exercise in a workout plan
export const updateExerciseInPlan = (req, res) => {
  try {
    const { userId } = req.user;
    // ... existing code ...
  } catch (error) {
    res.status(500).json({ message: 'Error updating exercise in plan', error: error.message });
  }
};

// Remove an exercise from a workout plan
export const removeExerciseFromPlan = (req, res) => {
  try {
    const { userId } = req.user;
    // ... existing code ...
  } catch (error) {
    res.status(500).json({ message: 'Error removing exercise from plan', error: error.message });
  }
};