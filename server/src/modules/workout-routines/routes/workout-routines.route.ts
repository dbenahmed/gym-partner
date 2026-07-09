import { Router } from 'express';
const router: Router = Router();
import {
    getUserWorkoutCollections,
    createWorkoutCollection,
    updateWorkoutCollection,
    deleteWorkoutCollection,
    getWorkoutRoutinesForCollection,
    createWorkoutRoutine,
    getWorkoutRoutineDetails,
    updateWorkoutRoutine,
    deleteWorkoutRoutine,
    addExerciseToRoutine,
    updateExerciseInRoutine,
    removeExerciseFromRoutine,
    getExercisesForRoutine
} from '@/modules/workout-routines/controllers/workout-routines.controller.js'
import authMiddleware from '@/core/middlewares/authMiddlewares.js';



// ! > done
// Get a list of all workout collections for the user
router.get('/workout/collections', authMiddleware, getUserWorkoutCollections);

// Create a new workout collection
router.post('/workout/collections', authMiddleware, createWorkoutCollection);

// Update a collection's name
router.put('/workout/collections/:collectionId', authMiddleware, updateWorkoutCollection);

// Delete a collection
router.delete('/workout/collections/:collectionId', authMiddleware, deleteWorkoutCollection);

// Get a list of all workout plans across collections
router.get('/workout/plans/:collectionId', authMiddleware, getWorkoutRoutinesForCollection);

// Create a new workout plan inside a collection
router.post('/workout/plans', authMiddleware, createWorkoutRoutine);
// ! < done

// ! done >
// Update a workout plan's name or collection
router.put('/workout/plans/:planId', authMiddleware, updateWorkoutRoutine);

// Delete a workout plan
router.delete('/workout/plans/:planId', authMiddleware, deleteWorkoutRoutine);

// Add an exercise to a workout plan
router.post('/workout/plans/:planId/exercises', authMiddleware, addExerciseToRoutine);

// Update an exercise in a workout plan
// ! CANCELLED - مانحتاجوهاش حاليا
// FOR UPDATING THE ORDER OF THE EXERCISES INSIDE A PLAN
router.put('/workout/plans/:planId/exercises/:exerciseId', authMiddleware, updateExerciseInRoutine);

// Remove an exercise from a workout plan
router.delete('/workout/plans/:planId/exercises/:exerciseId', authMiddleware, removeExerciseFromRoutine);
// ! < done


router.get('/workout/plans/:planId/exercises', authMiddleware, getExercisesForRoutine);

export default router;
