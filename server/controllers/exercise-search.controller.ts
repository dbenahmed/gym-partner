import { Request, Response } from "express";
import * as exerciseSearchService from "../services/exercise-search.service.js";
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

        const data = await exerciseSearchService.getAllExercisesService(queries, page, limit);

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

        const data = await exerciseSearchService.getExerciseDetailsService(exerciseId);

        return res.status(200).json({
            success: true,
            data: data
        });

    } catch (error: any) {
        const status = error.status || 500;
        res.status(status).json({ message: error.message || 'Error retrieving exercise details', error: error.message });
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

        const data = await exerciseSearchService.getLatestExerciseStatsService(exerciseId, userId);

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
