import { and, eq } from "drizzle-orm";
import db from "../db/index.js";
import { exercises, plansExercises, sessions } from "../db/schemas/dev/schema.js";
import verifyPlanCreatedByUser from "./functions/verifyPlanWasCreatedByUser.js";
import { isHHMMSS, isYYYYMMDD } from "./functions/isDate.js";

// Start a new workout session
// In this route I did not add the exercises to the sessionsExercises table,
// I only created the session and send the exercise of the selected planId
// to the client's frontend 
// todo : negotiate about this features with team later
export const createWorkoutSession = async (req, res) => {
  try {
    const userId = req.user;
    const userDate = req.userDate;
    const {
      planId,
      dueDate,
      name,
      startTime,
      note,
    } = req.body
    if (!dueDate || !name || !startTime) {
      res.status(401).json({
        message: "Due Date not Included"
      })
    }
    // verify format of the dueDate
    const isYYYYMMDD = isYYYYMMDD(dueDate)
    if (!isYYYYMMDD.success) {
      res.status(401).json({
        message: "Due Date does not follow the format YYYY-MM-DD"
      })
    }
    // verify format of the startDate
    const isHHMMSS = isHHMMSS(dueDate)
    if (!isHHMMSS.success) {
      res.status(401).json({
        message: "Start Time does not follow the format HH-MM-SS"
      })
    }

    // verify sessions not already exist ( name not used )
    const nameExists = await db.query.sessions.findFirst({
      where: and(eq(sessions.name, name), eq(sessions.duedate, dueDate))
    })
    if (nameExists) {
      res.status(201).json({
        success: false,
        message: "This name already in on that day"
      })
    }
    // create the sessions
    let createdSession; // created session infos
    let exercisesToAdd = []; // exercises to add to the session
    if (!planId) {
      // get make an empty session
      createdSession = await db.insert(sessions).values({
        planId: null,
        name,
        duedate: dueDate,
        starttime: startTime,
        endtime: null,
        note: note,
        rating: null
      }).returning({
        id: plans.id
      })
    } else {
      // get exercises from plan
      // verify plan created by that user (authorized)
      const authorized = await verifyPlanCreatedByUser(planId, userId)
      const finished = db.transaction(async (tx) => {
        // get the exercises of this plan
        const exercisesIds = await tx.query.plansExercises.findMany({
          where: eq(plansExercises.planId, planId),
          columns: {
            exerciseId: true
          }
        })
        // verify the exercises are found and is array
        if (Array.isArray(exercisesIds)) {
          // get the exercises data and infos for each exercise inside the plan
          for (let i = 0; i < exercisesIds.length; i++) {
            const foundExercise = await tx.query.exercises.findFirst({
              where: eq(exercises.id, exercisesIds[i].exerciseId)
            })
            if (foundExercise) {
              exercisesToAdd.push(foundExercise)
            } else {
              console.error('given exercise id not found')
            }
          }
        }
        // create the session
        created = await tx.insert(sessions).values({
          planId: planId,
          name,
          duedate: dueDate,
          starttime: startTime,
          endtime: null,
          note: note,
          rating: null
        }).returning({
          id: sessions.id
        })
      }).catch((e) => {
        console.error(e)
      })
    }
    res.status(201).json({
      success: true,
      message: "Plan Created Successfully",
      data: {
        session: createdSession,
        exercises: exercisesToAdd
      }
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error creating workout session', error: error.message });
  }
};

// Get a list of past workout sessions for the user
export const getWorkoutSessions = async (req, res) => {
  try {
    const userId = req.user;
    // ... existing code ...
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving workout sessions', error: error.message });
  }
};

// Get details of a specific session
export const getWorkoutSessionDetails = async (req, res) => {
  try {
    const userId = req.user;
    // ... existing code ...
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving workout session details', error: error.message });
  }
};

// Add an exercise to an active session
export const saveExerciseToSession = async (req, res) => {
  try {
    const userId = req.user;
    // verify if user authorized 

    // if exists already update changes

    // if does not exist add new exercise to the session

  } catch (error) {
    res.status(500).json({ message: 'Error adding exercise to session', error: error.message });
  }
};

// Log a set for an exercise
export const logSetForExercise = async (req, res) => {
  try {
    const userId = req.user;
    // ... existing code ...
  } catch (error) {
    res.status(500).json({ message: 'Error logging set for exercise', error: error.message });
  }
};

// Update session details
export const updateWorkoutSession = async (req, res) => {
  try {
    const userId = req.user;
    // ... existing code ...
  } catch (error) {
    res.status(500).json({ message: 'Error updating workout session', error: error.message });
  }
};

// Delete a session
export const deleteWorkoutSession = async (req, res) => {
  try {
    const userId = req.user;
    // ... existing code ...
  } catch (error) {
    res.status(500).json({ message: 'Error deleting workout session', error: error.message });
  }
}; 