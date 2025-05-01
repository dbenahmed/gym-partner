import { and, eq } from "drizzle-orm";
import db from "../db/index.js";

import { exercises, plansExercises, sessions, setsOfSessionsExercises } from "../db/schemas/dev/schema.js";
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
        const userData = req.userData;
        const {
            planId,
            dueDate,
            name,
            startTime,
            endTime,
            note,
            rating,
            exercisesArray,
        } = req.body;
        console.log('backend')
        console.log(req.body)


        if (rating || (rating > 5 || rating < 0)) {
            return res.status(401).json({
                success: false,
                message: "Rating must be between 1 and 5"
            })
        }

        console.log('rating', rating)
        if (!dueDate || !name) {
            return res.status(401).json({
                success: false,
                message: "Due Date / name / startTime not Included"
            })
        }
        // verify format of the dueDate
        const isYYYYMMDDFormat = isYYYYMMDD(dueDate)
        if (!isYYYYMMDDFormat.success) {
            return res.status(401).json({
                success: false,
                message: "Due Date does not follow the format YYYY-MM-DD"
            })
        }
        console.log('dueDate', dueDate)
        // verify format of the startDate
        if (startTime) {
            const startTimeIsHHMMSSFormat = isHHMMSS(startTime)
            if (!startTimeIsHHMMSSFormat.success) {
                return res.status(401).json({
                    success: false,
                    message: "Start Time does not follow the format HH-MM-SS"
                })
            }
        }
        if (endTime) {
            const endTimeIsHHMMSSFormat = isHHMMSS(endTime)
            if (!endTimeIsHHMMSSFormat.success) {
                return res.status(401).json({
                    success: false,
                    message: "End Time does not follow the format HH-MM-SS"
                })
            }
        }
        // verify sessions not already exist ( name not used )
        const nameExists = await db.query.sessions.findFirst({
            where: and(eq(sessions.createdBy, userId), eq(sessions.name, name), eq(sessions.duedate, dueDate))
        })
        console.log('nameExists', nameExists)
        if (nameExists) {
            return res.status(201).json({
                success: false,
                message: "This name already used on that day"
            })
        }
        // verify plan created by that user (authorized)
        if (planId) {
            const authorized = await verifyPlanCreatedByUser(planId, userId)
            console.log('authorized', authorized)
            if (!authorized) {
                return res.status(401).json({
                    success: false,
                    message: "You are not authorized to use this plan"
                })
            }
        }
        console.log('authorized', planId)

        console.log('exercisesArray', exercisesArray)

        // verify the exercisesArray is array
        if (exercisesArray && !Array.isArray(exercisesArray) && exercisesArray.length === 0) {
            return {
                success: false,
                message: "Exercises Array is not an array",
                statusCode: 404
            }
        }

        const finished = await db.transaction(async (tx) => {
            console.log('tx', tx)

            // create the session
            const createdSessions = await tx.insert(sessions).values({
                planId: planId ? planId : null,
                name: name,
                duedate: dueDate,
                starttime: startTime ? startTime : null,
                endtime: endTime ? endTime : null,
                note: note ? note : null,
                rating: rating ? rating : null,
                createdBy: userId,
            }).returning({
                id: sessions.id
            })
            const createdSession = createdSessions[0].id;

            console.log('createdSession', createdSession)

            const exercisesValidation = await Promise.all(exercisesArray.map(async (exo) => {
                console.log("exo", exo)
                // verify if the exercise exist
                const foundExercise = await tx.query.exercises.findFirst({
                    where: eq(exercises.id, exo.id)
                })
                if (!foundExercise) {
                    return {
                        success: false,
                        statusCode: 404,
                        message: "Exercise not found"
                    }
                }

                const weights = exo.sets.map((set) => set.weight)
                const units = exo.sets.map((set) => set.unit)
                const reps = exo.sets.map((set) => set.reps)

                // verify if the number of weights, units and reps are the same
                if (weights.length !== units.length || weights.length !== reps.length) {
                    return {
                        success: false,
                        statusCode: 401,
                        message: "The number of weights, units and reps are not the same"
                    }
                }

                console.log('passed verification ')
                // return the data for inserting the exercises
                return {
                    success: true,
                    data: {
                        id: exo.id,
                        weights: weights,
                        units: units,
                        reps: reps,
                        order: exo.order
                    }
                }
            }))

            console.log('exercisesValidation', exercisesValidation)
            if (!exercisesValidation.every(exo => exo.success)) {
                return {
                    success: false,
                    message: exercisesValidation.message,
                    statusCode: exercisesValidation.statusCode
                }
            }



            const objects = exercisesValidation.map(exo => {
                return {
                    exerciseId: exo.data.id,
                    sessionId: createdSession,
                    weight: exo.data.weights,
                    unit: exo.data.units,
                    reps: exo.data.reps,
                    order: exo.data.order
                }
            })



            const insertedExo = await tx.insert(setsOfSessionsExercises).values(objects).returning()

            return {
                success: true,
                message: "Exercises created successfully",
                statusCode: 200,
                data: insertedExo
            }
        })

        console.log("finished", finished)
        if (!finished.success && finished.statusCode) {
            return res.status(finished.statusCode).json({
                success: false,
                message: finished.message,
                statusCode: finished.statusCode
            })
        } else if (!finished.success) {
            return res.status(500).json({
                success: false,
                message: finished.message,
            })
        }


        console.log('finished', finished)

        res.status(201).json({
            success: true,
            message: "Plan Created Successfully",
            data: finished.data
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
        const { date } = req.query;
        const isYYYYMMDDFormat = isYYYYMMDD(date)
        if (!isYYYYMMDDFormat.success) {
            return res.status(401).json({
                success: false,
                message: "Date does not follow the format YYYY-MM-DD"
            })
        }

        
        const foundedSessions = await db
            .select()
            .from(sessions)
            .where(and(eq(sessions.createdBy, userId), eq(sessions.duedate, date)));
        if (!foundedSessions) {
            return res.status().jsom({
                message: "there is no session created by this user ",
            })
        } else {
            return res.status(200).json({
                success: true,
                userSessions: foundedSessions,
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

        const foundSessions = await db.query.sessions.findMany({
            where: eq(sessions.createdBy, userId)
        })

        if (!foundSessions) {
            return res.status(404).json({
                success: false,
                message: "Session not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Session found",
            session: foundSessions
        })
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving workout session details', error: error.message });
    }
};

// Add an exercise to an active session
export const saveExerciseToSession = async (req, res) => {
    try {
        const userId = req.user;
        const { sessionId, Id, weight, unit, reps } = req.body;

        // todo : verify if user authorized 
        //check if the session exist and created by this user 
        const foundSessions = await db
            .select()
            .from(sessions)
            .where(eq(sessions.id, sessionId));
        if (!foundSessions) {
            return res.status(404).json({
                success: false,
                message: "Session not found"
            })
        }
        session = foundSessions[0];
        // check if created by this user 
        if (session.createdBy !== userId) {
            return res.status(401).json({
                success: false,
                message: "this session wasn't created by this user "
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
        sessionExercises = session.sessionExercises;
        const existExercise = await db.query.sessionExercises.findFirst(
            where(eq(sessionExercises.id, Id))
        )







        // if exists already update changes
        if (existExercise) {
            await db.update(session.sessionExercises).set({
                weight: weight,
                reps: reps,
                unit: unit,
                dueDate: new Date(),
            })
        }
        res.status(200).json({
            success: true,
            message: "the exercise is updated in the session "
        })







        // if does not exist add new exercise to the session
        if (!existExercise) {
            await db.insert(session.sessionExercises).values({
                weight: weight,
                reps: reps,
                unit: unit,
                dueDate: new Date(),
            })
        }
        return res.status(200).json({
            success: true,
            message: "the exercise is added to the session "
        })

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

// todo : verify
// Update session details
export const updateWorkoutSession = async (req, res) => {
  try {
    const userId = req.user;
   const {sessionId , newSessionName , newExercises } = req.body;
   const checkTheSession = await db
   .select()
   .from(sessions)
   .where(eq(sessions.id,sessionId));
   if (checkTheSession.length === 0){
    return res.status(400).json({
      success:false,
      message:"the session is not exist verify the id !"
    })
   }
   if (newSessionName){
   await db.update(sessions).set({
    name : newSessionNamem ,
  }).where(eq(sessions.id,sessionId));
}
if (newExercises)
   {
    await db
    .delete(setsOfSessionsExercises)
    .where(eq(setsOfSessionsExercises.id,sessionId));
    newExercises.forEach( async ele => {
      await db.insert(setsOfSessionsExercises).values({
        sessionId : sessionId,
        exerciseId : ele.exerciseId,
        creationdate : ele.creationdate,
        order : ele.order,
        weight: ele.weight,
        reps: ele.reps,

      })
    });

   }






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