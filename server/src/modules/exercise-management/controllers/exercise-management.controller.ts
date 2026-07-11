import { Request, Response } from "express";
import { AuthenticatedRequest } from "@/core/types/auth.types.js";

// todo : to be implemented
// Create a new exercise inside exercises database
// todo : to be implemented
export const createNewExercise = (req: Request, res: Response) => {
    try {
        const userId = (req as AuthenticatedRequest).user;
        // To be implemented
    } catch (error: any) {
        res.status(500).json({ message: 'Error creating a new exercise', error: error.message });
    }
};

// todo : to be implemented
// Update an existing exercise
// todo : to be implemented
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

// todo : to be implemented
// Delete an existing exercise
// todo : to be implemented
export const deleteExercise = (req: Request, res: Response) => {
    try {
        const userId = (req as AuthenticatedRequest).user;
        const exerciseId = parseInt(req.params.exerciseId, 10);

        res.status(200).json({ message: 'Exercise deleted successfully' });
    } catch (error: any) {
        res.status(500).json({ message: 'Error deleting exercise', error: error.message });
    }
};
