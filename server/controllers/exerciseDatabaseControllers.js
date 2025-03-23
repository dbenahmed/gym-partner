import db from "../db/index.js";
import { collections, exercises, plans, users } from "../db/schemas/dev/schema.js";
import { and, eq } from "drizzle-orm";

// Get a list of all available exercises
export const getAllExercises = async (req, res) => {
  try {
    const userId = req.user;
    const userData = req.userData
    const queries = {
      "force": req.query.force,
      "level": req.query.level,
      "mechanic": req.query.mechanic,
      "equipment": req.query.equipment,
      "primarymuscles": req.query.primarymuscles,
      "secondarymuscles": req.query.secondarymuscles,
      "category": req.query.category,
    }
    const { page } = req.query
    const limit = (req.query.limit) ? parseInt(req.query.limit) : 1;

    const filteredQueries = Object.fromEntries(Object.entries(queries).filter((v, i) => v[1] !== ""))

    console.log('filteredQueries', filteredQueries)
    const andConditions = Object.entries(filteredQueries).map(([key, value]) => {
      return eq(exercises[key], value)
    })
    const foundExercises = await db.select({
      ...exercises,
      exosCount: db.$count(exercises, and(...andConditions))
    }).from(exercises).where(
      and(
        ...andConditions
      )
    ).limit(limit).offset(page)

    console.log(foundExercises.length)

    res.status(200).json({ success: true, data: foundExercises })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error retrieving all exercises', error: error.message });
  }
};

// Get details for a specific exercise
export const getExerciseDetails = (req, res) => {
  try {
    const userId = req.user;
    // ... existing code ...
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving exercise details', error: error.message });
  }
};

// Create a new exercise inside exercises database
export const createNewExercise = (req, res) => {
  try {
    const userId = req.user;
  } catch (error) {
    res.status(500).json({ message: 'Error creating a new exercise', error: error.message })
  }
}

// Update an existing exercise
export const updateExercise = (req, res) => {
  try {
    const userId = req.user;
    const { exerciseId } = req.params;
    const updatedData = req.body;


    res.status(200).json({ message: 'Exercise updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating exercise', error: error.message });
  }
};

// Delete an existing exercise
export const deleteExercise = (req, res) => {
  try {
    const userId = req.user;
    const { exerciseId } = req.params;

    res.status(200).json({ message: 'Exercise deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting exercise', error: error.message });
  }
};