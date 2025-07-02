import { Request, Response, NextFunction } from "express";
import WeightLogsServices from "../services/weightLogsServices.js";
export default class WeightController {
  weightLogsServices;
  constructor() {
    console.log("WeightController constructor called");
    this.weightLogsServices = new WeightLogsServices();
    console.log("WeightLogsServices instantiated:", this.weightLogsServices);
    console.log("hi property:", this.weightLogsServices.hi);
  }

  // Get a history of the user's weight logs
  getWeightLogs = async (
    req: Request & { user: number },
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = req.user;
      console.log(userId);
      console.log(this.weightLogsServices.hi);
      const weights = await this.weightLogsServices.getUserWeights({ userId });
      return res.status(200).json({
        success: true,
        message: "Weight logs retrieved successfully",
        data: weights,
      });
    } catch (error) {
      next(error);
    }
  };

  // Log a new weight entry
  logWeightEntry = async (
    req: Request & { user: number },
    res: Response,
    next: NextFunction
  ) => {
    try {
      const newWeight = await this.weightLogsServices.insertUserWeight({
        ...req.body,
        userId: req.user,
      });
      return res.status(200).json({
        success: true,
        message: "Weight entry logged successfully",
        data: newWeight,
      });
    } catch (error) {
      console.log("catched");
      next(error);
    }
  };

  // Update a specific weight entry
  updateWeightEntry = async (
    req: Request & { user: number },
    res: Response,
    next: NextFunction
  ) => {
    const userId = req.user;
    const { entryId } = req.params;

    try {
      const updatedWeight =await  this.weightLogsServices.updateWeight({
        ...req.body,
        userId,
        entryId,
      });
      return res.status(200).json({
        success: true,
        message: "Weight entry updated successfully",
      });
    } catch (error) {
      next(error);
    }
  };

  // Delete a specific weight entry
  deleteWeightEntry = async (
    req: Request & { user: number },
    res: Response,
    next: NextFunction
  ) => {
    const userId = req.user;
    const { entryId } = req.params;
    try {
      const deletedWeight = await this.weightLogsServices.deleteWeight({
        id: parseInt(entryId),
        userId,
      });
      return res.status(200).json({
        success: true,
        message: "Weight entry deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  };
}
