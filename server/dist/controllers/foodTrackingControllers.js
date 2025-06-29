import { and, desc, eq } from "drizzle-orm";
import db from "../db/index.js";
import { isYYYYMMDD } from "./functions/isDate.js";
import { foods, foodsLogs } from "../db/schemas/schema.js";
// Get a list of meals logged for today
export const getMeals = async (req, res) => {
    try {
        const userId = req.user;
        const userData = req.userData;
        const { date } = req.query;
        const foundMeals = await db.query.foodsLogs.findMany({
            where: and(eq(date, foodsLogs.date), eq(foodsLogs.userId, userId)),
            orderBy: desc(foodsLogs.creationdate),
        });
        const foundMealsWithFood = await Promise.all(foundMeals.map(async (meal) => {
            meal.food = await db.query.foods.findFirst({
                where: eq(foods.id, meal.foodId)
            });
            return meal;
        }));
        res.status(202).json({
            success: true,
            message: "found food successfully",
            data: foundMeals
        });
        // ... existing code ...
    }
    catch (error) {
        res.status(500).json({ message: 'Error retrieving today meals', error: error.message });
    }
};
// Add a new meal to today's log
export const addMeal = async (req, res) => {
    try {
        const userId = req.user;
        const userData = req.userData;
        const { date, foodId, description, servingSize, } = req.body;
        // verify var date is acrually a valid date
        const isDate = isYYYYMMDD(date);
        if (!isDate.success) {
            res.status(401).json({
                success: false,
                message: "date does not follow the format YYYY-MM-DD"
            });
            return;
        }
        const logDate = new Date(date);
        // todo : security : verify description regexp
        // verify foodId exists
        const foundFood = await db.query.foods.findFirst({
            where: eq(foods.id, foodId)
        });
        if (!foundFood) {
            res.status(404).json({
                success: false,
                message: "Food Id is in valid ( food not found )"
            });
            return;
        }
        // verify serving size
        let desc;
        desc = description;
        if (description === undefined || description === null) {
            desc = "";
        }
        const inserts = {
            date,
            foodId: foundFood.id,
            userId: userId,
            description: desc,
            servingsizeG: servingSize
        };
        const insertedFood = await db.insert(foodsLogs).values(inserts).returning({
            id: foodsLogs.id,
            foodId: foodsLogs.foodId,
            servingsizeG: foodsLogs.servingsizeG,
            description: foodsLogs.description,
            date: foodsLogs.date,
            creationDate: foodsLogs.creationdate,
        });
        res.json({
            success: true, message: "Meal added successfully", insertedFood
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error adding meal', error: error.message });
    }
};
// todo : lowp : Update an existing meal in today's log
export const updateMeal = async (req, res) => {
    try {
        const userId = req.user;
        const { servingsizeG } = req.body;
        const { mealId } = req.params;
        const checkTheMeal = await db
            .select()
            .from(foodsLogs)
            .where(eq(foodsLogs.id, mealId));
        if (checkTheMeal.length === 0) {
            return res.status(400).json({
                success: false,
                message: "the session is not exist verify the id  "
            });
        }
        await db.update(foodsLogs).set({
            servingsizeG: servingsizeG,
        }).where(eq(foodsLogs.id, mealId));
        return res.status(200).json({
            success: true,
            message: "the meal is updated successfully"
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating meal', error: error.message });
    }
};
// Delete a meal from today's log
export const deleteMeal = async (req, res) => {
    try {
        const userId = req.user;
        const userDate = req.userData;
        const { mealId } = req.params;
        const foundFood = await db.query.foodsLogs.findFirst({
            where: eq(foodsLogs.id, mealId)
        });
        if (!foundFood) {
            res.status(404).json({
                success: false,
                message: "unfound food"
            });
            return;
        }
        if (foundFood.userId !== userId) {
            res.status(401).json({
                success: false,
                message: 'not authorized'
            });
        }
        await db.delete(foodsLogs).where(eq(foodsLogs.id, mealId));
        res.status(200).json({
            success: true,
            message: 'food deleted successfuly'
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting meal', error: error.message });
    }
};
