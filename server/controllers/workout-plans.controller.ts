// Import Request and Response types from express for strong TypeScript typing
import { Request, Response } from 'express';
// Import all service functions that handle business logic for workout plans
import * as svc from '../services/workout-plans.service.js';

// Controller to handle fetching a list of all workout collections for a user
export const getWorkoutCollections = async (req: Request, res: Response): Promise<void> => {
    // Wrap the logic in a try-catch block for safe error handling
    try {
        // Extract the userId from the authenticated request object and typecast it to a number
        const userId = req.user as number;
        
        // Call the service layer to fetch all collections belonging to this user
        const foundCollections = await svc.getWorkoutCollectionsService(userId);
        
        // Return a 202 Accepted status with the fetched collections and a success message
        res.status(202).json({
            success: true,
            data: foundCollections,
            message: "Collection Found Successfully"
        });
        
    // Catch any unexpected errors that occur during the process
    } catch (e: any) {
        // Log a 400 Bad Request status and provide the specific error message
        res.status(400).json({
            success: false,
            errors: e.message,
            message: "An error occurred while fetching the collections"
        });
    }
};

// Controller to handle the creation of a new workout collection
export const createWorkoutCollection = async (req: Request, res: Response): Promise<void> => {
    // Wrap the logic in a try-catch block for safe error handling
    try {
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
        
    // Catch any unexpected errors that occur during the process
    } catch (error: any) {
        // Check if the error indicates that the collection title is already in use
        if (error.message === "Collection title already used") {
            // Return a 400 Bad Request if it's a duplicate title error
            res.status(400).json({ success: false, message: error.message });
            // Exit the catch block early
            return;
        }
        
        // Log a 500 Internal Server Error status for any other unhandled issues
        res.status(500).json({ message: 'Error creating workout collection', error: error.message });
    }
};

// Controller to handle updating a collection's name or description
export const updateWorkoutCollection = async (req: Request, res: Response): Promise<void> => {
    // Wrap the logic in a try-catch block for safe error handling
    try {
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
        
    // Catch any unexpected errors that occur during the process
    } catch (e: any) {
        // If the service indicates the collection doesn't exist, return a 404 Not Found
        if (e.message === "Collection does not exist") {
            // Send the specific error message back to the client
            res.status(404).json({ success: false, message: e.message });
            // Exit the catch block early
            return;
        }
        
        // Log a 400 Bad Request status for any other unhandled issues during the update
        res.status(400).json({ success: false, errors: e.message, message: "An error occurred while updating the collection" });
    }
};

// Controller to handle deleting a workout collection
export const deleteWorkoutCollection = async (req: Request, res: Response): Promise<void> => {
    // Wrap the logic in a try-catch block for safe error handling
    try {
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
        
    // Catch any unexpected errors that occur during the process
    } catch (e: any) {
        // Check if the service indicates the collection doesn't exist or user lacks permission
        if (e.message === "Collection does not exist or user is unauthorized") {
            // Return a 401 Unauthorized status with the specific error message
            res.status(401).json({ success: false, message: e.message });
            // Exit the catch block early
            return;
        }
        
        // Log a 400 Bad Request status for any other unhandled issues
        res.status(400).json({ success: false, errors: e.message, message: "An error occurred while updating the collection" });
    }
};

// Controller to handle fetching a list of all workout plans inside a specific collection
export const getWorkoutPlans = async (req: Request, res: Response): Promise<void> => {
    // Wrap the logic in a try-catch block for safe error handling
    try {
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
        const foundPlans = await svc.getWorkoutPlansService(parseInt(collectionId), userId);
        
        // Return a 200 OK status containing the array of fetched plans
        res.status(200).json({ success: true, data: foundPlans });
        
    // Catch any unexpected errors that occur during the process
    } catch (error: any) {
        // Check if the service indicates the user lacks permission for this collection
        if (error.message === 'Collection does not exist or user is unauthorized') {
            // Return a 401 Unauthorized status with the specific error message
            res.status(401).json({ success: false, message: error.message });
            // Exit the catch block early
            return;
        }
        
        // Log a 500 Internal Server Error status for any other unhandled issues
        res.status(500).json({ message: 'Error retrieving workout plans', error: error.message });
    }
};

// Controller to handle creating a new workout plan inside a collection
export const createWorkoutPlan = async (req: Request, res: Response): Promise<void> => {
    // Wrap the logic in a try-catch block for safe error handling
    try {
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
        const inserted = await svc.createWorkoutPlanService(title, parseInt(collectionId), userId);
        
        // Return a 201 Created status containing the newly created plan data
        res.status(201).json({ success: true, message: 'Plan created successfully', data: inserted });
        
    // Catch any unexpected errors that occur during the process
    } catch (error: any) {
        // Check if the service indicates the collection doesn't exist or user lacks permission
        if (error.message === 'Collection does not exist or user is not authorized') {
            // Return a 409 Conflict status indicating permission or data integrity issues
            res.status(409).json({ success: false, message: error.message });
            // Exit the catch block early
            return;
        }
        // Check if the service indicates a duplicate plan name in the collection
        if (error.message === 'plan name already used before') {
            // Return a 409 Conflict status indicating the duplication
            res.status(409).json({ success: false, message: error.message });
            // Exit the catch block early
            return;
        }
        
        // Log a 500 Internal Server Error status for any other unhandled issues
        res.status(500).json({ message: 'Error creating workout plan', error: error.message });
    }
};

// Controller to handle fetching details of a specific workout plan (placeholder)
export const getWorkoutPlanDetails = async (req: Request, res: Response): Promise<void> => {
    // Wrap the logic in a try-catch block for safe error handling
    try {
        // Returning a 501 Not Implemented status as this endpoint lacks implementation in original
        res.status(501).json({ message: 'Not implemented' });
        
    // Catch any unexpected errors that occur during the process
    } catch (error: any) {
        // Log a 500 Internal Server Error status for any other unhandled issues
        res.status(500).json({ message: 'Error retrieving workout plan details', error: error.message });
    }
};

// Controller to handle updating a workout plan's title
export const updateWorkoutPlan = async (req: Request, res: Response): Promise<void> => {
    // Wrap the logic in a try-catch block for safe error handling
    try {
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
        const updated = await svc.updateWorkoutPlanService(parseInt(planId), title, userId);
        
        // Return a 200 OK status containing the successfully updated plan data
        res.status(200).json({ success: true, message: 'Plan updated successfully', data: updated });
        
    // Catch any unexpected errors that occur during the process
    } catch (error: any) {
        // Check if the service indicates the plan doesn't exist or user lacks permission
        if (error.message === 'User not authorized or plan does not exist') {
            // Return a 401 Unauthorized status with the specific error message
            res.status(401).json({ success: false, message: error.message });
            // Exit the catch block early
            return;
        }
        
        // Log a 500 Internal Server Error status for any other unhandled issues
        res.status(500).json({ message: 'Error updating workout plan', error: error.message });
    }
};

// Controller to handle deleting a workout plan
export const deleteWorkoutPlan = async (req: Request, res: Response): Promise<void> => {
    // Wrap the logic in a try-catch block for safe error handling
    try {
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
        await svc.deleteWorkoutPlanService(parseInt(planId), userId);
        
        // Return a 200 OK status indicating successful deletion
        res.status(200).json({ success: true, message: 'Plan deleted successfully' });
        
    // Catch any unexpected errors that occur during the process
    } catch (error: any) {
        // Check if the service indicates the plan doesn't exist or user lacks permission
        if (error.message === 'User unauthorized or plan does not exist') {
            // Return a 401 Unauthorized status with the specific error message
            res.status(401).json({ success: false, message: error.message });
            // Exit the catch block early
            return;
        }
        
        // Log a 500 Internal Server Error status for any other unhandled issues
        res.status(500).json({ message: 'Error deleting workout plan', error: error.message });
    }
};

// Controller to handle adding exercises to a workout plan
export const addExerciseToPlan = async (req: Request, res: Response): Promise<void> => {
    // Wrap the logic in a try-catch block for safe error handling
    try {
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
        await svc.addExerciseToPlanService(parseInt(planId), exercisesIds, userId);
        
        // Return a 200 OK status indicating success
        res.json({ success: true, message: "Exercise successfully added to the plan" });
        
    // Catch any unexpected errors that occur during the process
    } catch (error: any) {
        // Check if the error indicates authorization issues, existence issues, or duplication
        if (error.message === "Plan does not exist or user is not authorized" || error.message === "Exercise does not exist" || error.message === "Exercise already exists in this plan") {
            // Return a 401 Unauthorized status with the specific error message and attached custom data
            res.status(401).json({ success: false, message: error.message, data: error.data });
            // Exit the catch block early
            return;
        }
        // Check if specific exercises passed in the array were not found in the DB
        if (error.message === "One or more exercises do not exist") {
            // Return a 401 Unauthorized status with details about which exercises failed
            res.status(401).json({ success: false, message: error.message, data: error.data });
            // Exit the catch block early
            return;
        }
        
        // Log a 500 Internal Server Error status for any other unhandled issues
        res.status(500).json({ message: 'Error adding exercise to plan', error: error.message });
    }
};

// Controller to update a specific exercise inside a plan (placeholder)
export const updateExerciseInPlan = async (req: Request, res: Response): Promise<void> => {
    // Wrap the logic in a try-catch block for safe error handling
    try {
        // Returning a 501 Not Implemented status as this endpoint lacks implementation in original
        res.status(501).json({ message: 'Not implemented' });
        
    // Catch any unexpected errors that occur during the process
    } catch (error: any) {
        // Log a 500 Internal Server Error status for any other unhandled issues
        res.status(500).json({ message: 'Error updating exercise in plan', error: error.message });
    }
};

// Controller to handle removing an exercise from a workout plan
export const removeExerciseFromPlan = async (req: Request, res: Response): Promise<void> => {
    // Wrap the logic in a try-catch block for safe error handling
    try {
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
        await svc.removeExerciseFromPlanService(parseInt(planId), parseInt(exerciseId), userId);
        
        // Return a 200 OK status indicating successful removal
        res.json({ success: true, message: "Exercise successfully removed from the plan" });
        
    // Catch any unexpected errors that occur during the process
    } catch (error: any) {
        // Check if the service indicates plan doesn't exist, user lacks permission, or exercise isn't in plan
        if (error.message === "Plan does not exist or user is not authorized" || error.message === "Exercise does not exist in this plan") {
            // Return a 401 Unauthorized status with the specific error message
            res.status(401).json({ success: false, message: error.message });
            // Exit the catch block early
            return;
        }
        
        // Log a 500 Internal Server Error status for any other unhandled issues
        res.status(500).json({ message: 'Error removing exercise from plan', error: error.message });
    }
};

// Controller to handle fetching all exercises associated with a specific workout plan
export const getExercisesForPlan = async (req: Request, res: Response): Promise<void> => {
    // Wrap the logic in a try-catch block for safe error handling
    try {
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
        const foundExercises = await svc.getExercisesForPlanService(parseInt(planId), userId);
        
        // Return a 200 OK status containing the array of fetched exercises
        res.status(200).json({ success: true, data: foundExercises, message: "Exercises for plan retrieved successfully" });
        
    // Catch any unexpected errors that occur during the process
    } catch (error: any) {
        // Check if the service indicates the plan doesn't exist or user lacks permission
        if (error.message === "Plan does not exist or user is not authorized") {
            // Return a 401 Unauthorized status with the specific error message
            res.status(401).json({ success: false, message: error.message });
            // Exit the catch block early
            return;
        }
        
        // Log a 500 Internal Server Error status for any other unhandled issues
        res.status(500).json({ message: 'Error getting exercises for plan', error: error.message });
    }
};
