import { and, eq } from "drizzle-orm";
import db from "../db/index.js";
import { weightsLogs } from "../db/schemas/schema.js";

export default class WeightLogsRepository {
  constructor() {}
  insertUserWeight = async (userId: number, weight: number, unit: string) => {
    console.log("insering");
    return await db
      .insert(weightsLogs)
      .values({ userId, weight, unit })
      .returning();
  };
  getAllWeights = async (userId: number) => {
    console.log("hii");
    return await db
      .select()
      .from(weightsLogs)
      .where(eq(weightsLogs.userId, userId));
  };

  findWeight = async (id: number, userId: number) => {
    return await db.query.weightsLogs.findFirst({
      where: and(eq(weightsLogs.id, id), eq(weightsLogs.userId, userId)),
    });
  };
  updateWeight = async (
    id: number,
    userId: number,
    weight: number,
    unit: string
  ) => {
    return await db
      .update(weightsLogs)
      .set({ weight, unit })
      .where(and(eq(weightsLogs.id, id), eq(weightsLogs.userId, userId)));
  };
  deleteWeight = async (id: number, userId: number) => {
    return await db
      .delete(weightsLogs)
      .where(and(eq(weightsLogs.id, id), eq(weightsLogs.userId, userId)));
  };
}
