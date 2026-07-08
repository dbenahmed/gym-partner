import { eq, and } from "drizzle-orm";
import db from "../db/index.js";
import { foods } from "../db/schemas/schema.js";

type InsertFoodParams = typeof foods.$inferInsert;

export const findCustomFoodByNameAndUser = async (foodname: string, userId: number) => {
    return db.select().from(foods).where(
        and(
            eq(foods.foodname, foodname),
            eq(foods.custom, true),
            eq(foods.createdBy, userId)
        )
    ).limit(1);
};

export const createCustomFood = async (foodData: InsertFoodParams) => {
    return db.insert(foods).values(foodData).returning();
};

export const findCustomFoodById = async (mealId: number) => {
    return db.select().from(foods).where(eq(foods.id, mealId));
};

export const findAllCustomFoodsByUser = async (userId: number) => {
    return db.select().from(foods).where(
        and(
            eq(foods.custom, true),
            eq(foods.createdBy, userId)
        )
    );
};

export const findCustomFoodByIdAndUser = async (mealId: number, userId: number) => {
    return db.select().from(foods).where(
        and(
            eq(foods.id, mealId),
            eq(foods.custom, true),
            eq(foods.createdBy, userId)
        )
    ).limit(1);
};

export const deleteCustomFoodByIdAndUser = async (mealId: number, userId: number) => {
    return db.delete(foods).where(
        and(
            eq(foods.id, mealId),
            eq(foods.custom, true),
            eq(foods.createdBy, userId)
        )
    );
};
