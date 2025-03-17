const express = require('express');
const router = express.Router();
const { getAllExercises, getExerciseDetails } = require('../controllers/exerciseDatabaseControllers.js');

// Get a list of all available exercises
router.get('/explore/exercises', getAllExercises);

// Get details for a specific exercise
router.get('/explore/exercises/:exerciseId', getExerciseDetails);

module.exports = router; 