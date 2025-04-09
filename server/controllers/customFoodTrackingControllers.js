import { eq } from "drizzle-orm";

// Create a new custom meal
export const createCustomMeal = async (req, res) =>{
    try {
    const  {foodname  , calories,  proteinper100g ,carbohydratesper100g, fatper100g } = req.body ;
//    check if the meal is already exist 

    const existMeal = await db.select().from(foods).where(eq(foods.name,foodname)).limit(1);
    if (existMeal.length > 0 )
{
  return res.status(400).json({
    succes:false,
    message : "this meals is already exist"
 })}  
{
    const userID = req.user.id; 
    const result = await db.insert(foods).values({
        foodname,
        calories,
        proteinper100g,
        carbohydratesper100g,
        fatper100g,
        custom:true,
        created_by:userID, 
    })
    res.status(201).json({
     message : "the meals is added succesfuly",
     result,
    }) 
} } 
catch (err){
 res.json ({
    success : false,
    message : err.message
 });
}};

// Get a list of all custom meals created by the user
export const getCustomMeals = async (req, res) => {
    try{
   const {foodname}= req.body;
   const ExistFood = await db.select().from(foods).where(eq(foods.foodname,foodname));
  if (ExistFood.length === 0){

   return res.status(404).json({
    success:false,
        message : "this meal is not exist"
    })
  }
  {
    return res.status(200).json({
        success:true,
        meal : ExistFood[0]
    })
  }
}
catch (err) {
   res.status(500).json({
    success:false,
    message:err.message
   })
}
};

// Update a custom meal
export const updateCustomMeal = (req, res) => {};

// Delete a custom meal
export const deleteCustomMeal = (req, res) => {}; 