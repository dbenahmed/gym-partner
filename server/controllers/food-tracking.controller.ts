import { Request, Response } from 'express';
import { isYYYYMMDD } from "./functions/isDate.js";
import { getMealsService, addMealService, updateMealService, deleteMealService } from '../services/food-tracking.service.js';

// Get a list of meals logged for today
export const getMeals = async (req: Request, res: Response): Promise<void> => {
    try {
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

        const foundMeals = await getMealsService(date, userId);

        res.status(202).json({
            success: true,
            message: "found food successfully",
            data: foundMeals
        });
    } catch (error: any) {
        res.status(500).json({ message: 'Error retrieving today meals', error: error.message });
    }
};

// Add a new meal to today's log
export const addMeal = async (req: Request, res: Response): Promise<void> => {
    try {
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

        const insertedFood = await addMealService(date, foodId, userId, description, servingSize);

        res.json({
            success: true, message: "Meal added successfully", insertedFood
        });
    } catch (error: any) {
        console.error(error);
        if (error.message === "Food Id is in valid ( food not found )") {
            res.status(404).json({
                success: false,
                message: error.message
            });
            return;
        }
        res.status(500).json({ message: 'Error adding meal', error: error.message });
    }
};

// Update an existing meal in today's log
export const updateMeal = async (req: Request, res: Response): Promise<void> => {
    try {
        const { servingsizeG } = req.body;
        const { mealId } = req.params;

        if (servingsizeG == null || !mealId) {
            res.status(400).json({ success: false, message: 'mealId and servingsizeG are required' });
            return;
        }

        await updateMealService(parseInt(mealId), servingsizeG);

        res.status(200).json({
            success: true,
            message: "the meal is updated successfully"
        });
    } catch (error: any) {
        if (error.message === "the session is not exist verify the id") {
             res.status(400).json({
                success: false,
                message: "the session is not exist verify the id  "
            });
            return;
        }
        res.status(500).json({ message: 'Error updating meal', error: error.message });
    }
};

// Delete a meal from today's log
export const deleteMeal = async (req: Request, res: Response): Promise<void> => {
    try {
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

        await deleteMealService(parseInt(mealId), userId);

        res.status(200).json({
            success: true,
            message: 'food deleted successfuly'
        });
    } catch (error: any) {
        if (error.message === "unfound food") {
            res.status(404).json({
                success: false,
                message: "unfound food"
            });
            return;
        }
        if (error.message === "not authorized") {
             res.status(401).json({
                success: false,
                message: 'not authorized'
            });
            return;
        }
        res.status(500).json({ message: 'Error deleting meal', error: error.message });
    }
};
