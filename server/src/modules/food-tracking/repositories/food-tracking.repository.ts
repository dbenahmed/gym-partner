import { eq, and, desc } from "drizzle-orm";
import db from "@/db/index.js";
import { foods, foodsLogs } from "@/db/schemas/schema.js";

export const findLoggedFoodsByDateAndUser = async (date: string, userId: number) => {
    return db.query.foodsLogs.findMany({
        where: and(
            eq(foodsLogs.date, date),
            eq(foodsLogs.userId, userId)
        ),
        orderBy: desc(foodsLogs.creationdate),
    });
};

export const findFoodById = async (foodId: number) => {
    return db.query.foods.findFirst({
        where: eq(foods.id, foodId)
    });
};

type InsertFoodLogParams = typeof foodsLogs.$inferInsert;

export const insertFoodLog = async (data: InsertFoodLogParams) => {
    return db.insert(foodsLogs).values(data).returning({
        id: foodsLogs.id,
        foodId: foodsLogs.foodId,
        servingsizeG: foodsLogs.servingsizeG,
        description: foodsLogs.description,
        date: foodsLogs.date,
        creationDate: foodsLogs.creationdate,
    });
};

export const findFoodLogById = async (mealId: number) => {
    return db.select().from(foodsLogs).where(eq(foodsLogs.id, mealId));
};

export const updateFoodLog = async (mealId: number, servingsizeG: number) => {
    return db.update(foodsLogs).set({
        servingsizeG,
    }).where(eq(foodsLogs.id, mealId));
};

export const deleteFoodLog = async (mealId: number) => {
    return db.delete(foodsLogs).where(eq(foodsLogs.id, mealId));
};
