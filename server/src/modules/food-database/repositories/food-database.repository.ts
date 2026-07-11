import { ilike, or, and, eq } from "drizzle-orm";
import db from "@/db/index.js";
import { foods } from "@/db/schemas/schema.js";

export const findAllAvailableFoods = async (name: string, userId: number) => {
    return db.query.foods.findMany({
        where: and(
            ilike(foods.foodname, `%${name}%`),
            or(
                eq(foods.status, 'verified'),
                eq(foods.status, 'pending'),
                eq(foods.createdBy, userId)
            )
        )
    });
};

export const findFoodDetailsById = async (mealId: number) => {
    return db.query.foods.findFirst({
        where: eq(foods.id, mealId)
    });
};
