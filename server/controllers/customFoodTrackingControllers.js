import { eq, and } from "drizzle-orm";
import db from "../db/index.js";
import { foods } from "../db/schemas/schema.js";
// Create a new custom meal
export const createCustomMeal = async (req, res) => {
    try {
        const { foodname, calories, proteinper100g, carbohydratesper100g, fatper100g } = req.body;
        //    check if the meal is already exist 
        const userId = req.user;
        const existMeal = await db.select().from(foods).where(and(eq(foods.foodname, foodname), eq(foods.custom, true), eq(foods.createdBy, userId))).limit(1);
        if (existMeal.length > 0) {
            return res.status(400).json({
                success: false,
                message: "this meals is already exist"
            })
        }

        const result = await db.insert(foods).values({
            foodname,
            calories,
            proteinper100g,
            carbohydratesper100g,
            fatper100g,
            custom: true,
            createdBy: userId,
        }).returning();
        

        res.status(201).json({
            success: true,
            message: "the meals is added succesfuly",
            data: result[0],
        })


    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

// Get a list of all custom meals created by the user
export const getCustomMeals = async (req, res) => {
    try {
        const { mealId } = req.params.mealId
        const ExistFood = await db.select().from(foods).where(eq(foods.id, mealId));
        if (ExistFood.length === 0) {

            return res.status(404).json({
                success: false,
                message: "this meal is not exist"
            })
        }

        return res.status(200).json({
            success: true,
            meal: ExistFood[0]
        })

    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
};


// Delete a custom meal
export const deleteCustomMeal = async (req, res) => {
    try {
        const { mealId } = req.params.mealId;
        const userId = req.user;
        const ExistFood = await db.select().from(foods).where(and(eq(foods.id, mealId), eq(foods.custom, true), eq(foods.createdBy, userId))).limit(1);
        if (ExistFood.length === 0) {

            return res.status(404).json({
                success: false,
                message: "this meal is not exist"
            })
        }
        await db.delete(foods).where(and(eq(foods.id, mealId), eq(foods.custom, true), eq(foods.createdBy, userId)));
        return res.status(200).json({
            success: true,
            message: "the food is deleted successfully"
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }

};


// Update a custom meal
export const updateCustomMeal = (req, res) => { };
