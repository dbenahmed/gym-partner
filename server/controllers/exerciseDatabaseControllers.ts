import { Request, Response } from "express";
import * as exerciseDatabaseService from "../services/exerciseDatabaseServices.js";
import { AuthenticatedRequest } from "../types/auth.types.js";

// Get a list of all available exercises
export const getAllExercises = async (req: Request, res: Response) => {
    try {
        const queries = {
            name: req.query.name as string,
            force: req.query.force as string,
            level: req.query.level as string,
            mechanic: req.query.mechanic as string,
            equipment: req.query.equipment as string,
            primarymuscles: req.query.primarymuscle as string | string[],
            secondarymuscles: req.query.secondarymuscle as string | string[],
            category: req.query.category as string,
        };

        const page = parseInt(req.query.page as string) || 0;
        const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;

        const data = await exerciseDatabaseService.getAllExercisesService(queries, page, limit);

        res.status(200).json({
            success: true,
            data: data
        });
    } catch (error: any) {
        console.error(error);
        const status = error.status || 500;
        res.status(status).json({
            success: false,
            message: error.message || 'Error retrieving all exercises',
            error: error.message
        });
    }
};

// Get details for a specific exercise
export const getExerciseDetails = async (req: Request, res: Response) => {
    try {
        const exerciseId = parseInt(req.params.exerciseId, 10);

        if (isNaN(exerciseId)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid exercise ID'
            });
        }

        const data = await exerciseDatabaseService.getExerciseDetailsService(exerciseId);

        return res.status(200).json({
            success: true,
            data: data
        });

    } catch (error: any) {
        const status = error.status || 500;
        res.status(status).json({ message: error.message || 'Error retrieving exercise details', error: error.message });
    }
};

// Create a new exercise inside exercises database
export const createNewExercise = (req: Request, res: Response) => {
    try {
        const userId = (req as AuthenticatedRequest).user;
        // To be implemented
    } catch (error: any) {
        res.status(500).json({ message: 'Error creating a new exercise', error: error.message });
    }
};

// Update an existing exercise
export const updateExercise = (req: Request, res: Response) => {
    try {
        const userId = (req as AuthenticatedRequest).user;
        const exerciseId = parseInt(req.params.exerciseId, 10);
        const updatedData = req.body;

        res.status(200).json({ message: 'Exercise updated successfully' });
    } catch (error: any) {
        res.status(500).json({ message: 'Error updating exercise', error: error.message });
    }
};

// Delete an existing exercise
export const deleteExercise = (req: Request, res: Response) => {
    try {
        const userId = (req as AuthenticatedRequest).user;
        const exerciseId = parseInt(req.params.exerciseId, 10);

        res.status(200).json({ message: 'Exercise deleted successfully' });
    } catch (error: any) {
        res.status(500).json({ message: 'Error deleting exercise', error: error.message });
    }
};

export const getLatestExerciseStats = async (req: Request, res: Response) => {
    try {
        const userId = (req as AuthenticatedRequest).user;
        const exerciseId = parseInt(req.params.exerciseId, 10);

        if (isNaN(exerciseId)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid exercise ID'
            });
        }

        console.log("GETTING STATISTICS FOR EXERCISE: ", exerciseId, "USER ID: ", userId);

        const data = await exerciseDatabaseService.getLatestExerciseStatsService(exerciseId, userId);

        res.status(200).json({
            message: 'Latest Exercise Stats',
            success: true,
            data: data
        });
    } catch (error: any) {
        const status = error.status || 500;
        res.status(status).json({
            success: false,
            message: error.message || 'ERROR: error retreiving latest exercise stats'
        });
    }
};
