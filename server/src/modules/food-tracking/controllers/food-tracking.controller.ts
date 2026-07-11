import { Request, Response } from 'express';
import { isYYYYMMDD } from "@/core/utils/isDate.js";
import { getUserFoodsByDateService, logUserFoodForDateService, updateUserLoggedFoodService, deleteUserLoggedFoodService } from '@/modules/food-tracking/services/food-tracking.service.js';
import asyncHandler from "express-async-handler";

// Get a list of meals logged for today
export const getUserFoodsByDate = asyncHandler(async (req: Request, res: Response): Promise<void> => {

                const userId = req.user;
                const { date } = req.query as { date: string };

                if (!userId) {
                    res.status(401).json({ message: 'Unauthorized' });
                    return;
                }

                if (!date) {
                    res.status(400).json({ success: false, message: 'date is required' });
                    return;
                }

                const foundMeals = await getUserFoodsByDateService(date, userId);

                res.status(202).json({
                    success: true,
                    message: "found food successfully",
                    data: foundMeals
                });
        });

// Add a new meal to today's log
export const logUserFoodForDate = asyncHandler(async (req: Request, res: Response): Promise<void> => {

                const userId = req.user;
                const { date, foodId, description, servingSize } = req.body;

                if (!userId) {
                    res.status(401).json({ message: 'Unauthorized' });
                    return;
                }

                if (!date || foodId == null || servingSize == null) {
                    res.status(400).json({ success: false, message: 'date, foodId, and servingSize are required' });
                    return;
                }

                // verify var date is actually a valid date
                const isDate = isYYYYMMDD(date);
                if (!isDate.success) {
                    res.status(401).json({
                        success: false,
                        message: "date does not follow the format YYYY-MM-DD"
                    });
                    return;
                }

                const insertedFood = await logUserFoodForDateService(date, foodId, userId, description, servingSize);

                res.json({
                    success: true, message: "Meal added successfully", insertedFood
                });
        });

// Update an existing meal in today's log
export const updateUserLoggedFood = asyncHandler(async (req: Request, res: Response): Promise<void> => {

                const { servingsizeG } = req.body;
                const { mealId } = req.params;

                if (servingsizeG == null || !mealId) {
                    res.status(400).json({ success: false, message: 'mealId and servingsizeG are required' });
                    return;
                }

                await updateUserLoggedFoodService(parseInt(mealId), servingsizeG);

                res.status(200).json({
                    success: true,
                    message: "the meal is updated successfully"
                });
        });

// Delete a meal from today's log
export const deleteUserLoggedFood = asyncHandler(async (req: Request, res: Response): Promise<void> => {

                const userId = req.user;
                const { mealId } = req.params;

                if (!userId) {
                    res.status(401).json({ message: 'Unauthorized' });
                    return;
                }

                if (!mealId) {
                    res.status(400).json({ success: false, message: 'mealId is required' });
                    return;
                }

                await deleteUserLoggedFoodService(parseInt(mealId), userId);

                res.status(200).json({
                    success: true,
                    message: 'food deleted successfuly'
                });
        });
