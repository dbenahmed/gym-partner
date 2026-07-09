// Import Request and Response types from the express module for TypeScript typing
import { Request, Response } from 'express';
// Import the corresponding service functions to handle business logic
import { getAllMealsService, getMealDetailsService } from '../services/meal-database.service.js';

// Controller to handle fetching a list of all available meals
export const getAllMeals = async (req: Request, res: Response): Promise<void> => {
    // Start a try-catch block for safe error handling
    try {
        // Extract the userId from the authenticated request object and cast it to a number
        const userId = req.user as number;
        
        // Extract the 'name' query parameter and cast it to an object containing an optional string
        const { name } = req.query as { name?: string };

        // Call the service layer to retrieve meals matching the given name (or all if empty) for this user
        const meals = await getAllMealsService(name || "", userId);
        
        // Return a 200 OK status containing the fetched meals
        res.status(200).json({
            success: true,
            message: "Meals fetched successfully",
            meals: meals
        });
        
    // Catch any unexpected errors that occur during the process
    } catch (error: any) {
        // Log a 500 Internal Server Error status and provide the error message
        res.status(500).json({ message: 'Error fetching meals', error: error.message });
    }
};

// Controller to handle fetching detailed nutritional info for a specific meal
export const getMealDetails = async (req: Request, res: Response): Promise<void> => {
    // Start a try-catch block for safe error handling
    try {
        // Extract the mealId from the URL route parameters
        const { mealId } = req.params;
        
        // Validation: Ensure the mealId parameter was actually provided
        if (!mealId || isNaN(parseInt(mealId))) {
            // Return a 400 Bad Request status if mealId is missing or not a valid number
            res.status(400).json({ success: false, message: "Valid mealId is required" });
            // Exit the function early to prevent further execution
            return;
        }

        // Call the service layer, parsing the mealId into an integer, to fetch detailed info
        const meal = await getMealDetailsService(parseInt(mealId));
        
        // Validation: If no meal is returned, it means the ID does not exist in the DB
        if (!meal) {
            // Return a 404 Not Found status
            res.status(404).json({ success: false, message: "Meal not found" });
            // Exit the function early
            return;
        }
        
        // Return a 200 OK status containing the detailed meal info
        res.status(200).json({
            success: true,
            message: "Meal details fetched successfully",
            meal: meal
        });
        
    // Catch any unexpected errors that occur during the process
    } catch (error: any) {
        // Log a 500 Internal Server Error status and provide the error message
        res.status(500).json({ message: 'Error fetching meal details', error: error.message });
    }
};
