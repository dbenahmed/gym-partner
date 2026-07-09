import { findMealsByDateAndUser, findFoodById, insertMealLog, findMealLogById, updateMealLog, deleteMealLog } from '../repositories/food-tracking.repository.js';

export const getMealsService = async (date: string, userId: number) => {
    const foundMeals = await findMealsByDateAndUser(date, userId);
    const foundMealsWithFood = await Promise.all(foundMeals.map(async (meal) => {
        const food = await findFoodById(meal.foodId);
        return { ...meal, food };
    }));
    return foundMealsWithFood;
};

export const addMealService = async (date: string, foodId: number, userId: number, description: string | undefined | null, servingSize: number) => {
    const foundFood = await findFoodById(foodId);
    if (!foundFood) {
        throw new Error("Food Id is in valid ( food not found )");
    }

    const desc = description ?? "";
    const inserts = {
        date,
        foodId: foundFood.id,
        userId: userId,
        description: desc,
        servingsizeG: servingSize
    };

    const insertedFood = await insertMealLog(inserts);
    return insertedFood;
};

export const updateMealService = async (mealId: number, servingsizeG: number) => {
    const checkTheMeal = await findMealLogById(mealId);
    if (checkTheMeal.length === 0) {
        throw new Error("the session is not exist verify the id");
    }
    await updateMealLog(mealId, servingsizeG);
};

export const deleteMealService = async (mealId: number, userId: number) => {
    const foundFoodArray = await findMealLogById(mealId);
    const foundFood = foundFoodArray[0];
    
    if (!foundFood) {
        throw new Error("unfound food");
    }

    if (foundFood.userId !== userId) {
        throw new Error("not authorized");
    }

    await deleteMealLog(mealId);
};
