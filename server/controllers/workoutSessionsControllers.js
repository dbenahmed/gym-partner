import { and, eq, sql } from "drizzle-orm";
import db from "../db/index.js";

import {
  exercises,
  plansExercises,
  sessions,
  setsOfSessionsExercises,
} from "../db/schemas/schema.js";
import verifyPlanCreatedByUser from "./functions/verifyPlanWasCreatedByUser.js";
import { isHHMMSS, isYYYYMMDD } from "./functions/isDate.js";

// add a new workout session with its details
export const createWorkoutSession = async (req, res) => {
  try {
    const userId = req.user;
    const userData = req.userData;
    const {
      planId,
      name,
      note,
      rating,
      exercisesArray,
    } = req.body;
    const startTime = new Date(req.body.startTime);
    const endTime = new Date(req.body.endTime);
    console.log(req.body);


    // verify if rating is given
    if (!rating || rating > 5 || rating < 0) {
      return res.status(401).json({
        success: false,
        message: "Rating must be between 1 and 5",
      });
    }



    // verify if name is givem
    if (!name) {
      return res.status(401).json({
        success: false,
        message: "Name not Included",
      })
    }

    /* CANCELLED DUE DATE
    // if (!dueDate || !name) {
    //   return res.status(401).json({
    //     success: false,
    //     message: "Due Date / name / startTime not Included",
    //   });
    // }
    
      // verify format of the dueDate
      // const isYYYYMMDDFormat = isYYYYMMDD(dueDate);
      // if (!isYYYYMMDDFormat.success) {
      //  return res.status(401).json({
      //   success: false,
      //   message: "Due Date does not follow the format YYYY-MM-DD",
      // });
      //}
      // console.log("dueDate", dueDate); 
    */
    // verify format of the startDate


    if (!startTime) {
      return res.status(401).json({
        success: false,
        message: "Start Time not Included",
      })
      // cancelled starttime of format HHMMSS it is now a timestamp
      /*  const startTimeIsHHMMSSFormat = isHHMMSS(startTime);
       // if (!startTimeIsHHMMSSFormat.success) {
       //   return res.status(401).json({
       //     success: false,
       //     message: "Start Time does not follow the format HH-MM-SS",
       //   });
       // } 
      */
    }
    if (!endTime) {
      return res.status(401).json({
        success: false,
        message: "End Time not Included",
      })
      // cancelled endtime of format HHMMSS it is now a timestamp
      /*
      // const endTimeIsHHMMSSFormat = isHHMMSS(endTime);
      // if (!endTimeIsHHMMSSFormat.success) {
      //   return res.status(401).json({
      //     success: false,
      //     message: "End Time does not follow the format HH-MM-SS",
      //   });
      // } */
    }

    console.log('date', startTime.toISOString().split('T')[0])
    // verify sessions not already exist ( name not used )
    const nameExists = await db.query.sessions.findFirst({
      where: and(
        eq(sessions.createdBy, userId),
        eq(sessions.name, name),
        sql`DATE(${sessions.starttime}) = ${startTime.toISOString().split('T')[0]}`
      ),
    });

    if (nameExists) {
      return res.status(201).json({
        success: false,
        message: "This name already used on that day",
      });
    }
    // verify plan created by that user (authorized)
    if (planId) {
      const authorized = await verifyPlanCreatedByUser(planId, userId);
      console.log("authorized", authorized);
      if (!authorized) {
        return res.status(401).json({
          success: false,
          message: "You are not authorized to use this plan",
        });
      }
    }

    // verify the exercisesArray is array
    if (
      exercisesArray &&
      !Array.isArray(exercisesArray) &&
      exercisesArray.length === 0
    ) {
      return {
        success: false,
        message: "Exercises Array is not an array",
        statusCode: 404,
      };
    }

    const finished = await db.transaction(async (tx) => {

      // create the session
      const createdSessions = await tx
        .insert(sessions)
        .values({
          planId: planId ? planId : null,
          name: name,
          starttime: startTime,
          endtime: endTime ? endTime : null,
          note: note ? note : null,
          rating: rating ? rating : null,
          createdBy: userId,
        })
        .returning({
          id: sessions.id,
        });
      const createdSession = createdSessions[0].id;

      console.log("createdSession", createdSession);

      const exercisesValidation = await Promise.all(
        exercisesArray.map(async (exo) => {
          console.log("exo", exo);
          // verify if the exercise exist
          const foundExercise = await tx.query.exercises.findFirst({
            where: eq(exercises.id, exo.id),
          });
          if (!foundExercise) {
            return {
              success: false,
              statusCode: 404,
              message: "Exercise not found",
            };
          }

          const weights = exo.sets.map((set) => set.weight);
          const units = exo.sets.map((set) => set.unit);
          const reps = exo.sets.map((set) => set.reps);

          // verify if the number of weights, units and reps are the same
          if (
            weights.length !== units.length ||
            weights.length !== reps.length
          ) {
            return {
              success: false,
              statusCode: 401,
              message: "The number of weights, units and reps are not the same",
            };
          }

          console.log("passed verification ");
          // return the data for inserting the exercises
          return {
            success: true,
            data: {
              id: exo.id,
              weights: weights,
              units: units,
              reps: reps,
              order: exo.order,
            },
          };
        })
      );

      console.log("exercisesValidation", exercisesValidation);
      if (!exercisesValidation.every((exo) => exo.success)) {
        return {
          success: false,
          message: exercisesValidation.message,
          statusCode: exercisesValidation.statusCode,
        };
      }

      const objects = exercisesValidation.map((exo) => {
        return {
          exerciseId: exo.data.id,
          sessionId: createdSession,
          weight: exo.data.weights,
          unit: exo.data.units,
          reps: exo.data.reps,
          order: exo.data.order,
        };
      });

      const insertedExo = await tx
        .insert(setsOfSessionsExercises)
        .values(objects)
        .returning();

      return {
        success: true,
        message: "Exercises created successfully",
        statusCode: 200,
        data: insertedExo,
      };
    });

    console.log("finished", finished);
    if (!finished.success && finished.statusCode) {
      return res.status(finished.statusCode).json({
        success: false,
        message: finished.message,
        statusCode: finished.statusCode,
      });
    } else if (!finished.success) {
      return res.status(500).json({
        success: false,
        message: finished.message,
      });
    }

    console.log("finished", finished);

    res.status(201).json({
      success: true,
      message: "Plan Created Successfully",
      data: finished.data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error creating workout session",
      error: error.message,
    });
  }
};

// Get a list of past workout sessions for the user
export const getWorkoutSessions = async (req, res) => {
  try {
    const userId = req.user;
    const { date } = req.query;


    /*
      // const isYYYYMMDDFormat = isYYYYMMDD(date);
      // if (!isYYYYMMDDFormat.success) {
      //   return res.status(401).json({
      //     success: false,
      //     message: "Date does not follow the format YYYY-MM-DD",
      //   });
      // } 
    */
    const startTime = new Date(date);
    if (!startTime) {
      return res.status(401).json({
        success: false,
        message: "Date does not follow the format YYYY-MM-DD",
      });
    }
    const foundedSessions = await db
      .select()
      .from(sessions)
      .where(
        and(
          eq(sessions.createdBy, userId),
          sql`DATE(${sessions.starttime}) = ${startTime.toISOString().split('T')[0]}`,
        ));
    if (!foundedSessions) {
      return res.status().jsom({
        message: "there is no session created by this user ",
      });
    } else {
      return res.status(200).json({
        success: true,
        userSessions: foundedSessions,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving workout sessions",
      error: error.message,
    });
  }
};

// Get details of a specific session
export const getWorkoutSessionDetails = async (req, res) => {
  try {
    const userId = req.user;
    console.log("uuid", userId);
    const foundSession = await db.query.sessions.findFirst({
      where: and(
        eq(sessions.createdBy, userId),
        eq(sessions.id, req.params.sessionId)
      ),
      with: {
        setsOfSessionsExercises: {
          with: {
            exercises: true, // This will include the related exercise for each set
          },
        },
      },
    });

    if (!foundSession) {
      return res.status(404).json({
        success: false,
        message: "Session not found",
      });
    }

    const responseSessions = {
      id: foundSession.id,
      name: foundSession.name,
      startTtime: foundSession.starttime,
      endtime: foundSession.endtime,
      note: foundSession.note,
      rating: foundSession.rating,
      createdBy: foundSession.createdBy,
      duedate: foundSession.duedate,
    };
    const responseExercises = foundSession.setsOfSessionsExercises.map(
      (exercise) => ({
        id: exercise.id,
        exerciseId: exercise.exerciseId,
        sessionsId: exercise.sessionId,
        creationDate: exercise.creationdate,
        order: exercise.order,
        weight: exercise.weight,
        unit: exercise.unit,
        reps: exercise.reps,
        creationdate: exercise.creationdate,
        exercise: exercise.exercises,
      })
    );
    console.log(responseExercises[0]);
    res.status(200).json({
      success: true,
      message: "Session found",
      session: responseSessions,
      exercises: responseExercises,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving workout session details",
      error: error.message,
    });
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
        message: "Session not found",
      });
    }
    session = foundSessions[0];
    // check if created by this user
    if (session.createdBy !== userId) {
      return res.status(401).json({
        success: false,
        message: "this session wasn't created by this user ",
      });
    }
    //   //check if the ex
    // const exercise = await db.query.exercises.findFirst({
    //   where: eq(exercises.name, exerciseName)
    // });

    if (!exercise) {
      return res.status(404).json({
        success: false,
        message: "Exercise not found",
      });
    }

    // check if the exercise exist in the sesion
    sessionExercises = session.sessionExercises;
    const existExercise = await db.query.sessionExercises.findFirst(
      where(eq(sessionExercises.id, Id))
    );

    // if exists already update changes
    if (existExercise) {
      await db.update(session.sessionExercises).set({
        weight: weight,
        reps: reps,
        unit: unit,
        dueDate: new Date(),
      });
    }
    res.status(200).json({
      success: true,
      message: "the exercise is updated in the session ",
    });

    // if does not exist add new exercise to the session
    if (!existExercise) {
      await db.insert(session.sessionExercises).values({
        weight: weight,
        reps: reps,
        unit: unit,
        dueDate: new Date(),
      });
    }
    return res.status(200).json({
      success: true,
      message: "the exercise is added to the session ",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error adding exercise to session",
      error: error.message,
    });
  }
};

// Log a set for an exercise
export const logSetForExercise = async (req, res) => {
  try {
    const userId = req.user;
    // ... existing code ...
  } catch (error) {
    res.status(500).json({
      message: "Error logging set for exercise",
      error: error.message,
    });
  }
};

// Update session details
export const updateWorkoutSession = async (req, res) => {
  try {
    const userId = req.user;
    const { sessionId, newSessionName, newExercises } = req.body;
    const checkTheSession = await db
      .select()
      .from(sessions)
      .where(eq(sessions.id, sessionId));
    if (checkTheSession.length === 0) {
      return res.status(400).json({
        success: false,
        message: "the session is not exist verify the id !",
      });
    }
    if (newSessionName) {
      await db
        .update(sessions)
        .set({
          name: newSessionName,
        })
        .where(eq(sessions.id, sessionId));
    }
    if (newExercises) {
      await db
        .delete(setsOfSessionsExercises)
        .where(eq(setsOfSessionsExercises.sessionId, sessionId));
      newExercises.forEach(async (ele) => {
        await db.insert(setsOfSessionsExercises).values({
          sessionId: sessionId,
          exerciseId: ele.exerciseId,
          creationdate: ele.creationdate,
          order: ele.order,
          weight: ele.weight,
          reps: ele.reps,
        });
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error updating workout session",
      error: error.message,
    });
  }
};

// Delete a session
export const deleteWorkoutSession = async (req, res) => {
  try {
    const userId = req.user;
    const { sessionId } = req.params;
    const checkTheSession = await db
      .select()
      .from(sessions)
      .where(eq(sessions.id, sessionId));
    if (checkTheSession.length === 0) {
      return res.status(400).json({
        success: false,
        message: "the session is not deleted verify the id !",
      });
    }
    await db.transaction(async (tx) => {
      try {
        await tx.delete(sessions).where(eq(sessions.id, sessionId));
        await tx
          .delete(setsOfSessionsExercises)
          .where(eq(setsOfSessionsExercises.sessionId, sessionId));
      } catch (error) {
        console.error("Transaction error:", error);
        throw error; // Rethrow the error to trigger transaction rollback
      }
    });
    return res.status(200).json({
      success: true,
      message: "the session is deleted successfully  ",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting workout session",
      error: error.message,
    });
  }
};
