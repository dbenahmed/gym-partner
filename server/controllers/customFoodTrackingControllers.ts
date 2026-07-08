import { Request, Response } from "express";
import * as customFoodTrackingService from "../services/customFoodTrackingServices.js";
import { AuthenticatedRequest } from "../types/auth.types.js";

// Create a new custom meal
export const createCustomMeal = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const { foodname, calories, proteinper100g, carbohydratesper100g, fatper100g } = req.body;
        const userId = req.user;

        const newMeal = await customFoodTrackingService.createCustomMealService(
            { foodname, calories, proteinper100g, carbohydratesper100g, fatper100g },
            userId
        );

        res.status(201).json({
            success: true,
            message: "the meals is added succesfuly",
            data: newMeal,
        });

    } catch (err: any) {
        const status = err.status || 500;
        res.status(status).json({
            success: false,
            message: err.message
        });
    }
};

// Get a list of all custom meals created by the user
export const getCustomMeals = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.user;
        const meals = await customFoodTrackingService.getAllCustomMealsService(userId);

        return res.status(200).json({
            success: true,
            meals: meals
        });

    } catch (err: any) {
        const status = err.status || 500;
        res.status(status).json({
            success: false,
            message: err.message
        });
    }
};

// Delete a custom meal
export const deleteCustomMeal = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const mealId = parseInt(req.params.mealId, 10);
        const userId = req.user;

        if (isNaN(mealId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid meal ID"
            });
        }

        await customFoodTrackingService.deleteCustomMealService(mealId, userId);

        return res.status(200).json({
            success: true,
            message: "the food is deleted successfully"
        });

    } catch (err: any) {
        const status = err.status || 500;
        res.status(status).json({
            success: false,
            message: err.message
        });
    }
};

// Update a custom meal
export const updateCustomMeal = (req: Request, res: Response) => {
    // To be implemented
};
