import { BadRequestError, NotFoundError } from "../errors/errors.js";
export default class WeightLogsServices {
    WeightLogsRepository;
    constructor(WeightLogsRepository) {
        this.WeightLogsRepository = WeightLogsRepository;
    }
    async insertUserWeight(body) {
        const { userId, weight, unit } = body;
        if (!userId || !weight || !unit) {
            throw new BadRequestError("Missing required fields");
        }
        return await this.WeightLogsRepository.insertUserWeight(userId, weight, unit);
    }
    async getUserWeights({ userId }) {
        if (!userId) {
            throw new BadRequestError("Missing required fields");
        }
        return await this.WeightLogsRepository.getAllWeights(userId);
    }
    async updateWeight({ entryId, userId, weight, unit, }) {
        if (!entryId || !userId || !weight || !unit) {
            throw new BadRequestError("Missing required fields");
        }
        // verify if it exists
        const foundWeight = await this.WeightLogsRepository.findWeight(entryId, userId);
        if (!foundWeight) {
            throw new NotFoundError("Weight not found");
        }
        return await this.WeightLogsRepository.updateWeight(entryId, userId, weight, unit);
    }
    async deleteWeight({ id, userId }) {
        if (!id || !userId) {
            throw new BadRequestError("Missing required fields");
        }
        // verify if it exists
        const foundWeight = await this.WeightLogsRepository.findWeight(id, userId);
        if (!foundWeight) {
            throw new NotFoundError("Weight not found");
        }
        return await this.WeightLogsRepository.deleteWeight(id, userId);
    }
}
