import { Request, Response } from "express";
import * as customFoodTrackingService from "@/modules/custom-food-tracking/services/custom-food-tracking.service.js";
import asyncHandler from "express-async-handler";

// Create a new custom meal
export const createUserCustomFood = asyncHandler(async (req: Request, res: Response) => {

                const { foodname, calories, proteinper100g, carbohydratesper100g, fatper100g } = req.body;
                const userId = req.user as number;

                const newMeal = await customFoodTrackingService.createUserCustomFoodService(
                    { foodname, calories, proteinper100g, carbohydratesper100g, fatper100g },
                    userId
                );

                res.status(201).json({
                    success: true,
                    message: "the meals is added succesfuly",
                    data: newMeal,
                });
        });

// Get a list of all custom meals created by the user
export const getAllUserCustomFoods = asyncHandler(async (req: Request, res: Response) => {

                const userId = req.user as number;
                const meals = await customFoodTrackingService.getAllCustomMealsService(userId);

                return res.status(200).json({
                    success: true,
                    meals: meals
                });
        });

// Delete a custom meal
export const deleteUserCustomFood = asyncHandler(async (req: Request, res: Response) => {

                const mealId = parseInt(req.params.mealId, 10);
                const userId = req.user as number;

                if (isNaN(mealId)) {
                    return res.status(400).json({
                        success: false,
                        message: "Invalid meal ID"
                    });
                }

                await customFoodTrackingService.deleteUserCustomFoodService(mealId, userId);

                return res.status(200).json({
                    success: true,
                    message: "the food is deleted successfully"
                });
        });

// Update a custom meal
// todo : to be implemented
export const updateUserCustomFood = (req: Request, res: Response) => {
    // To be implemented
};
