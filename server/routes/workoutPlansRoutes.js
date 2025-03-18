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
import authMiddleware from '../middleware/authMiddlewares.js';
// ! done
// Get a list of all workout collections for the user
router.get('/workout/collections', authMiddleware, getWorkoutCollections);

// Create a new workout collection
router.post('/workout/collections', authMiddleware, createWorkoutCollection);

// Update a collection's name
router.put('/workout/collections/:collectionId', authMiddleware, updateWorkoutCollection);

// Delete a collection
router.delete('/workout/collections/:collectionId', authMiddleware, deleteWorkoutCollection);
// ! done

// Get a list of all workout plans across collections
router.get('/workout/plans', authMiddleware, getWorkoutPlans);

// Create a new workout plan inside a collection
router.post('/workout/plans', authMiddleware, createWorkoutPlan);

// Get details of a specific workout plan
router.get('/workout/plans/:planId', authMiddleware, getWorkoutPlanDetails);

// Update a workout plan's name or collection
router.put('/workout/plans/:planId', authMiddleware, updateWorkoutPlan);

// Delete a workout plan
router.delete('/workout/plans/:planId', authMiddleware, deleteWorkoutPlan);

// Add an exercise to a workout plan
router.post('/workout/plans/:planId/exercises', authMiddleware, addExerciseToPlan);

// Update an exercise in a workout plan
router.put('/workout/plans/:planId/exercises/:exerciseId', authMiddleware, updateExerciseInPlan);

// Remove an exercise from a workout plan
router.delete('/workout/plans/:planId/exercises/:exerciseId', authMiddleware, removeExerciseFromPlan);

export default router;