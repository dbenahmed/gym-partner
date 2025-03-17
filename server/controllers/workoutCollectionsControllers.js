import db from "../db/index.js";
import {collections} from "../db/schemas/dev/schema.js";
import {eq} from "drizzle-orm";

export const getUserCollections = async (req, res) => {
    try {
        const userId = 80

        const foundCollections = await db.select({
            collectionId: collections.id,
            description: collections.description,
            title: collections.title
        }).from(collections).where(
            eq(collections.userId, userId)
        )

        res.status(202).json({
            success: true,
            data: foundCollections,
            message: "Collection Found Successfully"
        })
    } catch (e) {
        res.status(400).json({
            success: false,
            errors: e.message,
            message: "An error occurred while fetching the collections the collection"
        })
    }
}


export const updateUserCollection = async (req, res) => {
    try {
        const userId = 73
        const collectionId = req.params.collectionId
        const {title} = req.body

        // verify if the collection id is given in the request
        if (!collectionId) {
            return res.status(400).json({success: false, message: "Collection ID is required"});
        }


        // verify if the collection does exist
        const collectionExists = await db.select().from(collections).where(
            eq(collections.id, collectionId)
        ).limit(1)
        if (collectionExists.length === 0) {
            return res.status(404).json({success: false, message: "Collection does not exist"});
        }
        console.log(collectionExists)

        // verify if the collection was made by that user ( user is authorized to rename it )
        if (collectionExists[0].userId !== userId) {
            return res.status(403).json({success: false, message: "Not authorized to update this collection"});
        }

        // update the collection title
        await db.update(collections).set({
            "title": title
        }).where(eq(collections.id, collectionId))

        // get the updated collection
        const updatedCollection = await db
            .select()
            .from(collections)
            .where(eq(collections.id, collectionId))
            .limit(1);


        res.status(202).json({
            success: true,
            data: updatedCollection[0],
            message: "Updated Collection Title Successfully"
        })
    } catch (e) {
        res.status(400).json({
            success: false,
            errors: e.message,
            message: "An error occurred while updating the collection"
        })
    }
}


export const removeUserCollection = async (req, res) => {
    try {
        const userId = 73
        const collectionId = req.params.collectionId
        // verify if the collection id is given in the request
        if (!collectionId) {
            return res.status(400).json({success: false, message: "Collection ID is required"});
        }
        // verify if the collection does exist
        const collectionExists = await db.select().from(collections).where(
            eq(collections.id, collectionId)
        ).limit(1)
        if (collectionExists.length === 0) {
            return res.status(404).json({success: false, message: "Collection does not exist"});
        }
        console.log(collectionExists)

        // verify if the collection was made by that user ( user is authorized to rename it )
        if (collectionExists[0].userId !== userId) {
            return res.status(403).json({success: false, message: "Not authorized to update this collection"});
        }

        await db.delete(collections).where(eq(collections.id, collectionId))
        res.status(202).json({
            success: true,
            data: null,
            message: "Removed Collection Title Successfully"
        })
    } catch (e) {
        res.status(400).json({
            success: false,
            errors: e.message,
            message: "An error occurred while updating the collection"
        })
    }
}