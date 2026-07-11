// Import Request and Response types from the express module for TypeScript typing
import { Request, Response } from 'express';
// Import all service functions from the workoutSessionsServices file
import * as svc from '@/modules/workout-sessions/services/workout-sessions.service.js';
import asyncHandler from "express-async-handler";

// Controller to handle the creation of a new workout session
export const createWorkoutSession = asyncHandler(async (req: Request, res: Response): Promise<void> => {

                // Extract the userId from the authenticated request object and cast it as a number
                const userId = req.user as number;
                
                // Destructure the expected fields from the request body
                const { planId, name, note, rating, exercisesArray } = req.body;
                
                // Parse the provided startTime string into a JavaScript Date object
                const startTime = new Date(req.body.startTime);
                
                // Parse the endTime if it exists, otherwise leave it as undefined
                const endTime = req.body.endTime ? new Date(req.body.endTime) : undefined;

                // Validation: Check if rating is provided and strictly within the 0 to 5 range
                if (rating === null || rating === undefined || rating > 5 || rating < 0) {
                    // Return a 400 Bad Request status with an error message if the rating is invalid
                    res.status(400).json({ success: false, message: "Rating must be between 0 and 5" });
                    // Exit the function early
                    return;
                }

                // Validation: Ensure that a session name is provided
                if (!name) {
                    // Return a 400 Bad Request if the name is missing
                    res.status(400).json({ success: false, message: "Name not Included" });
                    // Exit the function early
                    return;
                }

                // Validation: Ensure the startTime was successfully parsed into a valid Date
                if (isNaN(startTime.getTime())) {
                    // Return a 400 Bad Request if the startTime is invalid or missing
                    res.status(400).json({ success: false, message: "Start Time not Included or invalid" });
                    // Exit the function early
                    return;
                }

                // Validation: If endTime is provided, ensure it was successfully parsed into a valid Date
                if (req.body.endTime && isNaN(endTime!.getTime())) {
                    // Return a 400 Bad Request if the endTime is invalid
                    res.status(400).json({ success: false, message: "End Time not Included or invalid" });
                    // Exit the function early
                    return;
                }

                // Validation: Ensure exercisesArray is provided and is a valid JavaScript array
                if (!exercisesArray || !Array.isArray(exercisesArray)) {
                    // Return a 400 Bad Request if the exercises array is missing or malformed
                    res.status(400).json({ success: false, message: "Exercises Array is missing or not an array" });
                    // Exit the function early
                    return;
                }

                // Call the service layer to create the workout session, passing all validated inputs
                const data = await svc.createWorkoutSessionService(userId, planId, name, note, rating, startTime, endTime, exercisesArray);
                
                // Return a 201 Created status along with the newly created session data
                res.status(201).json({ success: true, message: "Plan Created Successfully", data });
        });

// Controller to fetch a list of workout sessions for a specific date
export const getUserWorkoutSessionsByDate = asyncHandler(async (req: Request, res: Response): Promise<void> => {

                // Extract the userId from the authenticated request object and cast it as a number
                const userId = req.user as number;
                
                // Extract the date query parameter from the request
                const { date } = req.query as { date: string };

                // Validation: Ensure the date query parameter is provided
                if (!date) {
                    // Return a 400 Bad Request if the date is missing
                    res.status(400).json({ success: false, message: "Date is required" });
                    // Exit the function early
                    return;
                }

                // Parse the provided date string into a JavaScript Date object
                const startTime = new Date(date);
                
                // Validation: Ensure the date was successfully parsed into a valid Date
                if (isNaN(startTime.getTime())) {
                    // Return a 400 Bad Request if the date format is invalid
                    res.status(400).json({ success: false, message: "Date does not follow a valid format" });
                    // Exit the function early
                    return;
                }

                // Call the service layer to fetch the user's sessions for the specified date
                const userSessions = await svc.getUserWorkoutSessionsByDateService(userId, startTime);
                
                // Return a 200 OK status with the retrieved sessions
                res.status(200).json({ success: true, userSessions });
        });

// Controller to fetch detailed information about a specific workout session
export const getWorkoutSessionDetails = asyncHandler(async (req: Request, res: Response): Promise<void> => {

                // Extract the userId from the authenticated request object and cast it as a number
                const userId = req.user as number;
                
                // Extract the sessionId from the URL route parameters
                const { sessionId } = req.params;

                // Validation: Ensure the sessionId parameter is provided
                if (!sessionId) {
                    // Return a 400 Bad Request if the sessionId is missing
                    res.status(400).json({ success: false, message: "sessionId is required" });
                    // Exit the function early
                    return;
                }

                // Call the service layer to fetch detailed session info, parsing the ID to an integer
                const details = await svc.getWorkoutSessionDetailsService(parseInt(sessionId), userId);
                
                // Return a 200 OK status with the session details and its associated exercises
                res.status(200).json({ success: true, message: "Session found", session: details.session, exercises: details.exercises });
        });

// Controller to add an exercise to an active session (placeholder)
export const saveExerciseToSession = asyncHandler(async (req: Request, res: Response): Promise<void> => {

                // The original method was fundamentally broken with undefined variables
                // Returning a 501 Not Implemented status until this endpoint is fixed and written properly
                res.status(501).json({ message: 'Not implemented' });
        });

// Controller to log a specific set for an exercise (placeholder)
export const logSetForExercise = asyncHandler(async (req: Request, res: Response): Promise<void> => {

                // Returning a 501 Not Implemented status as this endpoint lacks implementation
                res.status(501).json({ message: 'Not implemented' });
        });

// Controller to update an existing workout session
export const updateWorkoutSession = asyncHandler(async (req: Request, res: Response): Promise<void> => {

                // Destructure the expected fields from the request body
                const { sessionId, newSessionName, newExercises } = req.body;

                // Validation: Ensure the sessionId is provided
                if (!sessionId) {
                    // Return a 400 Bad Request if the sessionId is missing
                    res.status(400).json({ success: false, message: "sessionId is required" });
                    // Exit the function early
                    return;
                }

                // Validation: Ensure at least one field (name or exercises) is provided to be updated
                if (!newSessionName && !newExercises) {
                    // Return a 400 Bad Request if there is no data to update
                    res.status(400).json({ success: false, message: "newSessionName or newExercises is required to update the session" });
                    // Exit the function early
                    return;
                }

                // Call the service layer to perform the update operation, parsing the sessionId to an integer
                await svc.updateWorkoutSessionService(parseInt(sessionId), newSessionName, newExercises);
                
                // Return a 200 OK status indicating the update was successful
                res.status(200).json({ success: true, message: "Workout session updated" });
        });

// Controller to delete a workout session
export const deleteWorkoutSession = asyncHandler(async (req: Request, res: Response): Promise<void> => {

                // Extract the sessionId from the URL route parameters
                const { sessionId } = req.params;

                // Validation: Ensure the sessionId parameter is provided
                if (!sessionId) {
                    // Return a 400 Bad Request if the sessionId is missing
                    res.status(400).json({ success: false, message: "sessionId is required" });
                    // Exit the function early
                    return;
                }

                // Call the service layer to delete the session, parsing the sessionId to an integer
                await svc.deleteWorkoutSessionService(parseInt(sessionId));
                
                // Return a 200 OK status indicating successful deletion
                res.status(200).json({ success: true, message: "the session is deleted successfully  " });
        });
