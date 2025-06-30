import { and, eq } from "drizzle-orm";
import db from "../db/index.js";
import { weightsLogs } from "../db/schemas/schema.js";
export default class WeightLogsRepository {
    async insertUserWeight(userId, weight, unit) {
        return await db
            .insert(weightsLogs)
            .values({ userId, weight, unit })
            .returning();
    }
    async getAllWeights(userId) {
        return await db
            .select()
            .from(weightsLogs)
            .where(eq(weightsLogs.userId, userId));
    }
    async findWeight(id, userId) {
        return await db.query.weightsLogs.findFirst({
            where: and(eq(weightsLogs.id, id), eq(weightsLogs.userId, userId)),
        });
    }
    async updateWeight(id, userId, weight, unit) {
        return await db
            .update(weightsLogs)
            .set({ weight, unit })
            .where(and(eq(weightsLogs.id, id), eq(weightsLogs.userId, userId)));
    }
    async deleteWeight(id, userId) {
        return await db
            .delete(weightsLogs)
            .where(and(eq(weightsLogs.id, id), eq(weightsLogs.userId, userId)));
    }
}
