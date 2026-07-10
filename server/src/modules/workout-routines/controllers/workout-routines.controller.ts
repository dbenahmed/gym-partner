// Import Request and Response types from express for strong TypeScript typing
import { Request, Response } from 'express';
// Import all service functions that handle business logic for workout plans
import * as svc from '@/modules/workout-routines/services/workout-routines.service.js';
import asyncHandler from "express-async-handler";

// Controller to handle fetching a list of all workout collections for a user
export const getUserWorkoutCollections = asyncHandler(async (req: Request, res: Response): Promise<void> => {

                // Extract the userId from the authenticated request object and typecast it to a number
                const userId = req.user as number;
                
                // Call the service layer to fetch all collections belonging to this user
                const foundCollections = await svc.getUserWorkoutCollectionsService(userId);
                
                // Return a 202 Accepted status with the fetched collections and a success message
                res.status(202).json({
                    success: true,
                    data: foundCollections,
                    message: "Collection Found Successfully"
                });
        });

// Controller to handle the creation of a new workout collection
export const createWorkoutCollection = asyncHandler(async (req: Request, res: Response): Promise<void> => {

                // Extract the userId from the authenticated request object and typecast it to a number
                const userId = req.user as number;
                
                // Destructure title and description from the request body
                const { title, description } = req.body;

                // Validation: Ensure the title is provided
                if (!title) {
                    // Return a 401 Unauthorized/Bad Request status if the title is missing
                    res.status(401).json({ success: false, message: 'Title or Description are not given' });
                    // Exit the function early
                    return;
                }

                // Call the service layer to create the new collection with the given details
                const inserted = await svc.createWorkoutCollectionService(title, description, userId);
                
                // Return a 201 Created status containing the newly created collection data
                res.status(201).json({
                    success: true,
                    message: 'Collection created successfully',
                    data: inserted
                });
        });

// Controller to handle updating a collection's name or description
export const updateWorkoutCollection = asyncHandler(async (req: Request, res: Response): Promise<void> => {

                // Extract the userId from the authenticated request object and typecast it to a number
                const userId = req.user as number;
                
                // Extract the collectionId from the URL route parameters
                const { collectionId } = req.params;
                
                // Destructure title and description from the request body
                const { title, description } = req.body;

                // Validation: Ensure at least a title or description is provided to update
                if (!title && !description) {
                    // Return a 400 Bad Request status if no data was provided
                    res.status(400).json({ success: false, message: "no data is given to update" });
                    // Exit the function early
                    return;
                }
                
                // Validation: Ensure the collectionId parameter is provided
                if (!collectionId) {
                    // Return a 400 Bad Request status if collectionId is missing
                    res.status(400).json({ success: false, message: "Collection ID is required" });
                    // Exit the function early
                    return;
                }

                // Call the service layer, parsing the collectionId into an integer, to perform the update
                const updated = await svc.updateWorkoutCollectionService(parseInt(collectionId), userId, title, description);
                
                // Return a 202 Accepted status containing the updated collection data
                res.status(202).json({
                    success: true,
                    data: updated,
                    message: "Updated Collection Title Successfully"
                });
        });

// Controller to handle deleting a workout collection
export const deleteWorkoutCollection = asyncHandler(async (req: Request, res: Response): Promise<void> => {

                // Extract the userId from the authenticated request object and typecast it to a number
                const userId = req.user as number;
                
                // Extract the collectionId from the URL route parameters
                const { collectionId } = req.params;

                // Validation: Ensure the collectionId parameter is provided
                if (!collectionId) {
                    // Return a 400 Bad Request status if collectionId is missing
                    res.status(400).json({ success: false, message: "Collection ID is required" });
                    // Exit the function early
                    return;
                }

                // Call the service layer, parsing the collectionId into an integer, to delete the collection
                await svc.deleteWorkoutCollectionService(parseInt(collectionId), userId);
                
                // Return a 202 Accepted status indicating successful deletion
                res.status(202).json({ success: true, message: "Removed Collection Successfully" });
        });

// Controller to handle fetching a list of all workout plans inside a specific collection
export const getWorkoutRoutinesForCollection = asyncHandler(async (req: Request, res: Response): Promise<void> => {

                // Extract the userId from the authenticated request object and typecast it to a number
                const userId = req.user as number;
                
                // Extract the collectionId from the URL route parameters
                const { collectionId } = req.params;

                // Validation: Ensure the collectionId parameter is provided
                if (!collectionId) {
                    // Return a 400 Bad Request status if collectionId is missing
                    res.status(400).json({ success: false, message: 'collectionId is required' });
                    // Exit the function early
                    return;
                }

                // Call the service layer, parsing the collectionId into an integer, to retrieve plans
                const foundPlans = await svc.getWorkoutRoutinesForCollectionService(parseInt(collectionId), userId);
                
                // Return a 200 OK status containing the array of fetched plans
                res.status(200).json({ success: true, data: foundPlans });
        });

// Controller to handle creating a new workout plan inside a collection
export const createWorkoutRoutine = asyncHandler(async (req: Request, res: Response): Promise<void> => {

                // Extract the userId from the authenticated request object and typecast it to a number
                const userId = req.user as number;
                
                // Destructure collectionId and title from the request body
                const { collectionId, title } = req.body;

                // Validation: Ensure both collectionId and title are provided
                if (!collectionId || !title) {
                    // Return a 400 Bad Request status if required fields are missing
                    res.status(400).json({ success: false, message: 'collectionId and title are required' });
                    // Exit the function early
                    return;
                }

                // Call the service layer, parsing the collectionId into an integer, to create the plan
                const inserted = await svc.createWorkoutRoutineService(title, parseInt(collectionId), userId);
                
                // Return a 201 Created status containing the newly created plan data
                res.status(201).json({ success: true, message: 'Plan created successfully', data: inserted });
        });

// Controller to handle fetching details of a specific workout plan (placeholder)
export const getWorkoutRoutineDetails = asyncHandler(async (req: Request, res: Response): Promise<void> => {

                // Returning a 501 Not Implemented status as this endpoint lacks implementation in original
                res.status(501).json({ message: 'Not implemented' });
        });

// Controller to handle updating a workout plan's title
export const updateWorkoutRoutine = asyncHandler(async (req: Request, res: Response): Promise<void> => {

                // Extract the userId from the authenticated request object and typecast it to a number
                const userId = req.user as number;
                
                // Destructure the new title from the request body
                const { title } = req.body;
                
                // Extract the planId from the URL route parameters
                const { planId } = req.params;

                // Validation: Ensure the title field is present (can be empty string, but not null)
                if (title == null) {
                    // Return a 400 Bad Request status if title is missing entirely
                    res.status(400).json({ success: false, message: "no data is given to update" });
                    // Exit the function early
                    return;
                }
                
                // Validation: Ensure the planId parameter is provided
                if (!planId) {
                    // Return a 400 Bad Request status if planId is missing
                    res.status(400).json({ success: false, message: "Plan ID is required" });
                    // Exit the function early
                    return;
                }

                // Call the service layer, parsing the planId into an integer, to perform the update
                const updated = await svc.updateWorkoutRoutineService(parseInt(planId), title, userId);
                
                // Return a 200 OK status containing the successfully updated plan data
                res.status(200).json({ success: true, message: 'Plan updated successfully', data: updated });
        });

// Controller to handle deleting a workout plan
export const deleteWorkoutRoutine = asyncHandler(async (req: Request, res: Response): Promise<void> => {

                // Extract the userId from the authenticated request object and typecast it to a number
                const userId = req.user as number;
                
                // Extract the planId from the URL route parameters
                const { planId } = req.params;

                // Validation: Ensure the planId parameter is provided
                if (!planId) {
                    // Return a 400 Bad Request status if planId is missing
                    res.status(400).json({ success: false, message: 'planId is required' });
                    // Exit the function early
                    return;
                }

                // Call the service layer, parsing the planId into an integer, to delete the plan
                await svc.deleteWorkoutRoutineService(parseInt(planId), userId);
                
                // Return a 200 OK status indicating successful deletion
                res.status(200).json({ success: true, message: 'Plan deleted successfully' });
        });

// Controller to handle adding exercises to a workout plan
export const addExerciseToRoutine = asyncHandler(async (req: Request, res: Response): Promise<void> => {

                // Extract the userId from the authenticated request object and typecast it to a number
                const userId = req.user as number;
                
                // Extract the planId from the URL route parameters
                const { planId } = req.params;
                
                // Destructure the exercisesIds array from the request body
                const { exercisesIds } = req.body;

                // Validation: Ensure the planId parameter is provided
                if (!planId) {
                    // Return a 400 Bad Request status if planId is missing
                    res.status(400).json({ success: false, message: "planId is required" });
                    // Exit the function early
                    return;
                }
                
                // Validation: Ensure the exercisesIds array is provided
                if (!exercisesIds) {
                    // Return a 400 Bad Request status if exercisesIds is missing
                    res.status(400).json({ success: false, message: "No exercises ids are given" });
                    // Exit the function early
                    return;
                }

                // Call the service layer, parsing the planId into an integer, to add all exercises to the plan
                await svc.addExerciseToRoutineService(parseInt(planId), exercisesIds, userId);
                
                // Return a 200 OK status indicating success
                res.json({ success: true, message: "Exercise successfully added to the plan" });
        });

// Controller to update a specific exercise inside a plan (placeholder)
export const updateExerciseInRoutine = asyncHandler(async (req: Request, res: Response): Promise<void> => {

                // Returning a 501 Not Implemented status as this endpoint lacks implementation in original
                res.status(501).json({ message: 'Not implemented' });
        });

// Controller to handle removing an exercise from a workout plan
export const removeExerciseFromRoutine = asyncHandler(async (req: Request, res: Response): Promise<void> => {

                // Extract the userId from the authenticated request object and typecast it to a number
                const userId = req.user as number;
                
                // Extract both planId and exerciseId from the URL route parameters
                const { planId, exerciseId } = req.params;

                // Validation: Ensure both parameters are provided in the URL
                if (!planId || !exerciseId) {
                    // Return a 400 Bad Request status if required fields are missing
                    res.status(400).json({ success: false, message: "planId and exerciseId are required" });
                    // Exit the function early
                    return;
                }

                // Call the service layer, parsing both IDs into integers, to delete the relation
                await svc.removeExerciseFromRoutineService(parseInt(planId), parseInt(exerciseId), userId);
                
                // Return a 200 OK status indicating successful removal
                res.json({ success: true, message: "Exercise successfully removed from the plan" });
        });

// Controller to handle fetching all exercises associated with a specific workout plan
export const getExercisesForRoutine = asyncHandler(async (req: Request, res: Response): Promise<void> => {

                // Extract the userId from the authenticated request object and typecast it to a number
                const userId = req.user as number;
                
                // Extract the planId from the URL route parameters
                const { planId } = req.params;

                // Validation: Ensure the planId parameter is provided
                if (!planId) {
                    // Return a 400 Bad Request status if planId is missing
                    res.status(400).json({ success: false, message: 'planId is required' });
                    // Exit the function early
                    return;
                }

                // Call the service layer, parsing the planId into an integer, to fetch linked exercises
                const foundExercises = await svc.getExercisesForRoutineService(parseInt(planId), userId);
                
                // Return a 200 OK status containing the array of fetched exercises
                res.status(200).json({ success: true, data: foundExercises, message: "Exercises for plan retrieved successfully" });
        });
