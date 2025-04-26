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
      ExerciseArray,
    } = req.body;
    
    if (!dueDate || !name || !startTime) {
     return   res.status(401).json({
        message: "Due Date not Included"
      })
    }
    // verify format of the dueDate
    const isYYYYMMDD = isYYYYMMDD(dueDate)
    if (!isYYYYMMDD.success) {
      return res.status(401).json({
        message: "Due Date does not follow the format YYYY-MM-DD"
      })
    }
    // verify format of the startDate
    const isHHMMSS = isHHMMSS(dueDate)
    if (!isHHMMSS.success) {
     return res.status(401).json({
        message: "Start Time does not follow the format HH-MM-SS"
      })
    }

    // verify sessions not already exist ( name not used )
    const nameExists = await db.query.sessions.findFirst({
      where: and(eq(sessions.name, name), eq(sessions.duedate, dueDate))
    })
    if (nameExists) {
     return  res.status(201).json({
        success: false,
        message: "This name already in on that day"
      })
    }
    // create the sessions
    let createdSession; // created session infos
    let sessionExercises = []; // exercises to add to the session
    if (!planId) {
      // get make an empty session
      createdSession = await db.insert(sessions).values({
        planId: null,
        name,
        duedate: dueDate,
        starttime: startTime,
        endtime: null,
        note: note,
        rating: null,
        createdBy:userId,
      }).returning({
        id: createdSession.id
      })
    } else {
      // verify plan created by that user (authorized)
      const authorized = await verifyPlanCreatedByUser(planId, userId)
      const finished = db.transaction(async (tx) => {
    
        // verify the exercisesArray is array
        if (Array.isArray(ExerciseArray)) {
          // get the exercises data and infos from the exercise array 
          //check if the exercise from the arrayExo from the  request are correct
          for (let i = 0; i < ExerciseArray.length; i++) {
            const foundExercise = ExerciseArray[i];
            if (foundExercise) {
              sessionExercises.push(foundExercise)
            } else {
              console.error('given exercise id not found')
            }
          }
        }
        // create the session
        createdSession = await tx.insert(sessions).values({
          planId: planId,
          name,
          duedate: dueDate,
          starttime: startTime,
          endtime: null,
          note: note,
          rating: null,
          createdBy:userId,
          // sessionExercises:sessionExercises,
        }).returning({
          CreatedSessionId: createdSession.id
        })
        for (let index = 0; index < sessionExercises.length; index++) {
          const exo = sessionExercises[index];
          for (let index2 = 0; index2 < exo.sets.length; index++) {
            createdSession = await tx.insert(sets_of_sessions_exercises).values({
                exercise_id : exo.id,
                session_id : CreatedSessionId,
                order : exo.order,
                weight:exo.weight,
                unit : exo.unit ,
                reps : exo.reps
            }
            ) 
          }
          
        }

      }).catch((e) => {
        console.error(e)
      })
    }
    res.status(201).json({
      success: true,
      message: "Plan Created Successfully",
      data: {
        session: createdSession,
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
    const foundedSessions = await db
    .select()
    .from(sessions)
    .where(eq(sessions.createdBy, userId));
    if (!foundedSessions){
      return res.status().jsom({
        message : "there is no session created by this user ",
      })
    } else{
      return res.status(200).json({
        success: true,
        userSessions : foundedSessions,
      })
    }
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
      const {sessionId,Id,weight,unit,reps} = req.body;
    
      // verify if user authorized 
      //check if the session exist and created by this user 
      const foundSessions =await db
      .select()
      .from(sessions)
      .where(eq(sessions.id, sessionId));
      if (!foundSessions){
        return res.status(404).json({
          success:false ,
          message:"Session not found"
        })
      }  
      session = foundSessions[0];
        // check if created by this user 
        if (session.createdBy !== userId ){
          return res.status(401).json({
            success:false ,
            message:"this session wasn't created by this user "
          })
        }
        //   //check if the ex
        // const exercise = await db.query.exercises.findFirst({
        //   where: eq(exercises.name, exerciseName)
        // });
    
        if (!exercise) {
          return res.status(404).json({
            success: false,
            message: "Exercise not found"
          });
        }



      // check if the exercise exist in the sesion
      sessionExercises= session.sessionExercises;
      const existExercise = await db.query.sessionExercises.findFirst(
        where(eq(sessionExercises.id, Id))
      )
     //exsiting code ...





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
   const {sessionId} = req.body;
   const checkTheSession = await db
   .select()
   .from(sessions)
   .where(eq(sessions.id,sessionId));
   if (checkTheSession.length === 0){
    return res.status(400).json({
      success:false,
      message:"the session is not deleted verify the id !"
    })
   }
     await db
     .delete(sessions)
     .where(eq(sessions.id,sessionId));
   return res.status(200).json({
    success:true,
    message : "the session is deleted successfully  ",
  })
   } catch (error) {
    res.status(500).json({ message: 'Error deleting workout session', error: error.message });
  }
}; 