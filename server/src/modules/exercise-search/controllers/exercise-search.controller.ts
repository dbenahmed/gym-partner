import { Request, Response } from "express";
import * as exerciseSearchService from "@/modules/exercise-search/services/exercise-search.service.js";
import { AuthenticatedRequest } from "@/core/types/auth.types.js";
import asyncHandler from "express-async-handler";

// Get a list of all available exercises
export const searchExercisesByQueries = asyncHandler(async (req: Request, res: Response) => {

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

                const data = await exerciseSearchService.searchExercisesByQueriesService(queries, page, limit);

                res.status(200).json({
                    success: true,
                    data: data
                });
        });

// Get details for a specific exercise
export const getExerciseDetails = asyncHandler(async (req: Request, res: Response) => {

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
        });

export const getLatestExerciseStats = asyncHandler(async (req: Request, res: Response) => {

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
        });
