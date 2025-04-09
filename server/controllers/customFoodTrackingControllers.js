
// Create a new custom meal
export const createCustomMeal = async (req, res) =>{
    try {
    const  {foodname  , calories,  proteinper100g ,carbohydratesper100g, fatper100g } = req.body ;
    const existMeal = await db.select().from(foods).where(eq(foods.name,name)).limit(1);
    if (existMeal.length > 0 )
{
 res.status(400).json({
    succes:false,
    message : "this meals is already exist"
 })  
}else{
    const result = await db.insert(foods).values({
        foodname,
        calories,
        proteinper100g,
        carbohydratesper100g,
        fatper100g,
        custom:true,
        created_by:user.id, 
    })
    res.status(201).json({
     message : "the meals is added succesfuly",
     result,
    }) 
} } 
catch (err){
 res.json ({
    succes : false,
    message : err.message
 });
}};

// Get a list of all custom meals created by the user
export const getCustomMeals = (req, res) => {

};

// Update a custom meal
export const updateCustomMeal = (req, res) => {};

// Delete a custom meal
export const deleteCustomMeal = (req, res) => {}; 