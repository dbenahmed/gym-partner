export default class WeightController {
    WeightLogsServices;
    constructor(WeightLogsServices) {
        this.WeightLogsServices = WeightLogsServices;
    }
    // Get a history of the user's weight logs
    getWeightLogs = (req, res, next) => {
        try {
            const userId = req.user;
            const weights = this.WeightLogsServices.getUserWeights({ userId });
            return res.status(200).json({
                success: true,
                message: "Weight logs retrieved successfully",
                data: weights,
            });
        }
        catch (error) {
            next();
        }
    };
    // Log a new weight entry
    logWeightEntry = (req, res, next) => {
        try {
            const newWeight = this.WeightLogsServices.insertUserWeight({
                ...req.body,
                userId: req.user,
            });
            return res.status(200).json({
                success: true,
                message: "Weight entry logged successfully",
                data: newWeight,
            });
        }
        catch (error) {
            next();
        }
    };
    // Update a specific weight entry
    updateWeightEntry = (req, res, next) => {
        const userId = req.user;
        const { entryId } = req.params;
        try {
            const updatedWeight = this.WeightLogsServices.updateWeight({
                ...req.body,
                userId,
                entryId,
            });
            return res.status(200).json({
                success: true,
                message: "Weight entry updated successfully",
            });
        }
        catch (error) {
            next();
        }
    };
    // Delete a specific weight entry
    deleteWeightEntry = (req, res, next) => {
        const userId = req.user;
        const { entryId } = req.params;
        try {
            const deletedWeight = this.WeightLogsServices.deleteWeight({
                id: parseInt(entryId),
                userId,
            });
            return res.status(200).json({
                success: true,
                message: "Weight entry deleted successfully",
            });
        }
        catch (error) {
            next();
        }
    };
}
