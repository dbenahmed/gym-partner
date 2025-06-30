import { BadRequestError, NotFoundError } from "../errors/errors.js";
import WeightLogsRepository from "../repositories/weightLogsRepo.js";

export default class WeightLogsServices {
  private weightLogsRepository: WeightLogsRepository;
  public hi = "hi";
  constructor() {
    this.weightLogsRepository = new WeightLogsRepository();
  }

  async insertUserWeight(body: {
    userId: number;
    weight: number;
    unit: string;
  }) {
    const { userId, weight, unit } = body;
    if (!userId || !weight || !unit) {
      throw new BadRequestError("Missing required fields");
      return
    }
    if (weight < 0 || weight > 300) {
      throw new BadRequestError("Weight must be between 0 and 300");
      return
    }
    if (unit !== "kg" && unit !== "lbs") {
      console.log("throwing")
      throw new BadRequestError("Unit must be kg or lbs");
      return
    }
    return await this.weightLogsRepository.insertUserWeight(
      userId,
      weight,
      unit
    );
  }
  async getUserWeights({ userId }: { userId: number }) {
    if (!userId) {
      throw new BadRequestError("Missing required fields");
    }
    console.log("here");
    return await this.weightLogsRepository.getAllWeights(userId);
  }
  async updateWeight({
    entryId,
    userId,
    weight,
    unit,
  }: {
    entryId: number;
    userId: number;
    weight: number;
    unit: string;
  }) {
    if (!entryId || !userId || !weight || !unit) {
      throw new BadRequestError("Missing required fields");
    }
    // verify if it exists
    const foundWeight = await this.weightLogsRepository.findWeight(
      entryId,
      userId
    );
    if (!foundWeight) {
      throw new NotFoundError("Weight not found");
    }

    return await this.weightLogsRepository.updateWeight(
      entryId,
      userId,
      weight,
      unit
    );
  }
  async deleteWeight({ id, userId }: { id: number; userId: number }) {
    if (!id || !userId) {
      throw new BadRequestError("Missing required fields");
    }
    // verify if it exists
    const foundWeight = await this.weightLogsRepository.findWeight(id, userId);
    if (!foundWeight) {
      throw new NotFoundError("Weight not found");
    }

    return await this.weightLogsRepository.deleteWeight(id, userId);
  }
}
