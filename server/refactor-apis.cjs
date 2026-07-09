const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

// 1. Rename directories and their internal files
const renameTasks = [
    { old: 'meal-database', new: 'food-database' },
    { old: 'meal-voting', new: 'food-voting' },
    { old: 'workout-plans', new: 'workout-routines' }
];

renameTasks.forEach(task => {
    const oldDir = path.join(srcDir, 'modules', task.old);
    const newDir = path.join(srcDir, 'modules', task.new);
    if (fs.existsSync(oldDir)) {
        // copy folder and remove
        function copyDir(src, dest) {
            fs.mkdirSync(dest, { recursive: true });
            const entries = fs.readdirSync(src, { withFileTypes: true });
            for (let entry of entries) {
                const srcPath = path.join(src, entry.name);
                const destPath = path.join(dest, entry.name);
                entry.isDirectory() ? copyDir(srcPath, destPath) : fs.copyFileSync(srcPath, destPath);
            }
        }
        copyDir(oldDir, newDir);
        fs.rmSync(oldDir, { recursive: true, force: true });
        
        // rename files inside
        const types = ['controllers', 'routes', 'services', 'repositories'];
        types.forEach(type => {
            const typeDir = path.join(newDir, type);
            if (!fs.existsSync(typeDir)) return;
            const items = fs.readdirSync(typeDir);
            items.forEach(item => {
                if (item.includes(task.old)) {
                    const newFileName = item.replace(task.old, task.new);
                    fs.renameSync(path.join(typeDir, item), path.join(typeDir, newFileName));
                }
            });
        });
    }
});

// 2. Global rename mapping for imports, function names, and variable names
const replacements = {
    // food-database
    'getAllMeals': 'getAllFoodsByQueries',
    'getMealDetails': 'getFoodDetailsById',
    'findAllAvailableMeals': 'findAllAvailableFoods',
    'findMealDetailsById': 'findFoodDetailsById',
    'mealDatabase': 'foodDatabase',
    'meal-database': 'food-database',

    // food-voting
    'voteForMeal': 'voteForFood',
    'getMealVotes': 'getFoodVotes',
    'mealVoting': 'foodVoting',
    'meal-voting': 'food-voting',

    // custom-food-tracking
    'createCustomMeal': 'createUserCustomFood',
    'getCustomMeals': 'getAllUserCustomFoods',
    'deleteCustomMeal': 'deleteUserCustomFood',
    'updateCustomMeal': 'updateUserCustomFood',
    'getCustomMealService': 'getUserCustomFoodService',

    // food-tracking
    'getMeals': 'getUserFoodsByDate',
    'addMeal': 'logUserFoodForDate',
    'updateMeal': 'updateUserLoggedFood',
    'deleteMeal': 'deleteUserLoggedFood',
    'findMealsByDateAndUser': 'findLoggedFoodsByDateAndUser',
    'insertMealLog': 'insertFoodLog',
    'findMealLogById': 'findFoodLogById',
    'updateMealLog': 'updateFoodLog',
    'deleteMealLog': 'deleteFoodLog',

    // exercise-search
    'getAllExercises': 'searchExercisesByQueries',

    // workout-plans -> workout-routines
    'workout-plans': 'workout-routines',
    'workoutPlans': 'workoutRoutines',
    'getWorkoutCollections': 'getUserWorkoutCollections',
    'getWorkoutPlans': 'getWorkoutRoutinesForCollection',
    'createWorkoutPlan': 'createWorkoutRoutine',
    'getWorkoutPlanDetails': 'getWorkoutRoutineDetails',
    'updateWorkoutPlan': 'updateWorkoutRoutine',
    'deleteWorkoutPlan': 'deleteWorkoutRoutine',
    'addExerciseToPlan': 'addExerciseToRoutine',
    'updateExerciseInPlan': 'updateExerciseInRoutine',
    'removeExerciseFromPlan': 'removeExerciseFromRoutine',
    'getExercisesForPlan': 'getExercisesForRoutine',
    'findPlanWithOwnership': 'findRoutineWithOwnership',
    'findPlansByCollectionId': 'findRoutinesByCollectionId',
    'findPlanByTitleAndCollectionId': 'findRoutineByTitleAndCollectionId',
    'createPlan': 'createRoutine',
    'updatePlan': 'updateRoutine',
    'deletePlan': 'deleteRoutine',
    'findPlanWithCollection': 'findRoutineWithCollection',
    'findExerciseInPlan': 'findExerciseInRoutine',
    'createPlanExercise': 'createRoutineExercise',
    'deletePlanExercise': 'deleteRoutineExercise',

    // workout-sessions
    'getWorkoutSessions': 'getUserWorkoutSessionsByDate',
};

// Add service permutations for the mapped ones
const keys = Object.keys(replacements);
keys.forEach(key => {
    if (!key.includes('-') && !key.endsWith('Service') && key.match(/^[a-z]/)) {
        replacements[key + 'Service'] = replacements[key] + 'Service';
    }
});

function applyReplacements(content) {
    let newContent = content;
    // We sort the keys by length descending so we don't partially replace longer names with shorter ones
    const sortedKeys = Object.keys(replacements).sort((a, b) => b.length - a.length);
    for (const key of sortedKeys) {
        // Regex with word boundaries for JS identifiers
        const regex = new RegExp(`\\b${key}\\b`, 'g');
        newContent = newContent.replace(regex, replacements[key]);
        
        // Also handle the string path replacements (like in app.ts router imports or module imports)
        if (key.includes('-')) {
            const pathRegex = new RegExp(key, 'g');
            newContent = newContent.replace(pathRegex, replacements[key]);
        }
    }
    return newContent;
}

function processDirectory(dir) {
    if (!fs.existsSync(dir)) return;
    const items = fs.readdirSync(dir);
    for (const item of items) {
        const fullPath = path.join(dir, item);
        if (fs.statSync(fullPath).isDirectory()) {
            processDirectory(fullPath);
        } else if (fullPath.endsWith('.ts') || fullPath.endsWith('.js')) {
            const original = fs.readFileSync(fullPath, 'utf8');
            let updated = applyReplacements(original);
            
            // special check for app.ts which imports routers like mealDatabaseRouter
            if (fullPath.endsWith('app.ts')) {
                updated = updated.replace(/mealDatabaseRouter/g, 'foodDatabaseRouter');
                updated = updated.replace(/mealVotingRouter/g, 'foodVotingRouter');
                updated = updated.replace(/workoutPlansRouter/g, 'workoutRoutinesRouter');
            }

            if (original !== updated) {
                fs.writeFileSync(fullPath, updated, 'utf8');
            }
        }
    }
}

processDirectory(srcDir);
console.log("Renamed directories, files, and functions successfully.");
