import { eq } from "drizzle-orm";
import db from "../../db/index.js";
import { plans, collections } from "../../db/schemas/schema.js";
export default async function verifyPlanCreatedByUser(planId, userId) {
    const plan = await db.query.plans.findFirst({
        where: eq(plans.id, planId)
    });
    if (!plan)
        return false;
    const collection = await db.query.collections.findFirst({
        where: eq(collections.id, plan.collectionId)
    });
    if (!collection)
        return false;
    return collection.userId === userId;
}
