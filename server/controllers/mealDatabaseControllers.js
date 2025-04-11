import { ilike } from "drizzle-orm";
import db from "../db/index.js";
import { foods } from "../db/schemas/dev/schema.js";

// Get a list of all available meals
export const getAllMeals = async (req, res) => {
    try {
        const { name } = req.query
        const meals = await db.query.foods.findMany({
            where: ilike(foods.foodname, `%${name}%`)
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
        // ... existing code ...
    } catch (error) {
        res.status(500).json({ message: 'Error updating today meal', error: error.message });
    }
}; 