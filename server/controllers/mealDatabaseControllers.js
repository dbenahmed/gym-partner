import { ilike, or, and } from "drizzle-orm";
import db from "../db/index.js";
import { foods } from "../db/schemas/dev/schema.js";
import { eq } from "drizzle-orm";
// Get a list of all available meals
export const getAllMeals = async (req, res) => {
    try {
        const userId = req.user;

        const { name } = req.query
        const meals = await db.query.foods.findMany({
            where: and(
                ilike(foods.foodname, `%${name}%`),
                or(
                    eq(foods.status, 'verified'),
                    eq(foods.status, 'pending'),
                    eq(foods.createdBy, userId)
                )
            )
        })
        res.status(200).json({
            success: true,
            message: "Meals fetched successfully",
            meals: meals
        })
    } catch (error) {
        res.status(500).json({ message: 'Error updating today meal', error: error.message });
    }
};

// Get detailed nutritional info for a specific meal
export const getMealDetails = async (req, res) => {
    try {
        const userId = req.user;
        const { mealId } = req.params;
        const meal = await db.query.foods.findFirst({
            where: eq(foods.id, mealId)
        })
        res.status(200).json({
            success: true,
            message: "Meal details fetched successfully",
            meal: meal
        })
    } catch (error) {
        res.status(500).json({ message: 'Error updating today meal', error: error.message });
    }
}; 
