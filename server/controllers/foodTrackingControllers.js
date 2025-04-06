import { desc, eq } from "drizzle-orm";
import db from "../db/index.js";
import { isYYYYMMDD } from "./functions/isDate.js";
import { foods, foodsLogs } from "../db/schemas/dev/schema.js";

// Get a list of meals logged for today
export const getMeals = (req, res) => {
  try {
    const userId = req.user;
    // ... existing code ...
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving today meals', error: error.message });
  }
};

// Add a new meal to today's log
export const addMeal = async (req, res) => {
  try {
    const userId = req.user;
    const userData = req.userData
    const {
      date,
      foodId,
      description,
      servingSize,
    } = req.body

    // verify var date is acrually a valid date
    const isDate = isYYYYMMDD(date)
    if (!isDate.success) {
      res.status(401).json({
        success: false,
        message: "date does not follow the format YYYY-MM-DD"
      })
      return;
    }
    const logDate = new Date(date)
    // todo : security : verify description regexp

    // verify foodId exists
    const foundFood = await db.query.foods.findFirst({
      where: eq(foods.id, foodId)
    })
    console.log("found food", foundFood)
    if (!foundFood) {
      res.status(404).json({
        success: false,
        message: "Food Id is in valid ( food not found )"
      })
      return
    }

    // verify serving size
    let desc
    desc = description
    if (description === undefined || description === null) {
      desc = ""
    }
    const inserts = {
      date,
      foodId: foundFood.id,
      userId: userId,
      description: desc,
      servingsizeG: servingSize
    }
    await db.insert(foodsLogs).values(inserts)

    res.json({ success: true, message: "Meal added successfully" })
  } catch (error) {
    res.status(500).json({ message: 'Error adding meal', error: error.message });
  }
};

// todo : lowp : Update an existing meal in today's log
export const updateMeal = (req, res) => {
  try {
    const userId = req.user;
    // ... existing code ...
  } catch (error) {
    res.status(500).json({ message: 'Error updating meal', error: error.message });
  }
};

// Delete a meal from today's log
export const deleteMeal = (req, res) => {
  try {
    const userId = req.user;
    const userDate = req.userData;
    
  } catch (error) {
    res.status(500).json({ message: 'Error deleting meal', error: error.message });
  }
}; 