import express from 'express';
const router = express.Router();
import {
    getWorkoutCollections,
    createWorkoutCollection,
    updateWorkoutCollection,
    deleteWorkoutCollection,
    getWorkoutPlans,
    createWorkoutPlan,
    getWorkoutPlanDetails,
    updateWorkoutPlan,
    deleteWorkoutPlan,
    addExerciseToPlan,
    updateExerciseInPlan,
    removeExerciseFromPlan
} from '../controllers/workoutPlansControllers.js'

// Get a list of all workout collections for the user
router.get('/workout/collections', getWorkoutCollections);

// Create a new workout collection
router.post('/workout/collections', createWorkoutCollection);

// Update a collection's name
router.put('/workout/collections/:collectionId', updateWorkoutCollection);

// Delete a collection
router.delete('/workout/collections/:collectionId', deleteWorkoutCollection);

// Get a list of all workout plans across collections
router.get('/workout/plans', getWorkoutPlans);

// Create a new workout plan inside a collection
router.post('/workout/plans', createWorkoutPlan);

// Get details of a specific workout plan
router.get('/workout/plans/:planId', getWorkoutPlanDetails);

// Update a workout plan's name or collection
router.put('/workout/plans/:planId', updateWorkoutPlan);

// Delete a workout plan
router.delete('/workout/plans/:planId', deleteWorkoutPlan);

// Add an exercise to a workout plan
router.post('/workout/plans/:planId/exercises', addExerciseToPlan);

// Update an exercise in a workout plan
router.put('/workout/plans/:planId/exercises/:exerciseId', updateExerciseInPlan);

// Remove an exercise from a workout plan
router.delete('/workout/plans/:planId/exercises/:exerciseId', removeExerciseFromPlan);

export default router;