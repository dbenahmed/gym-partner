import express from "express";
import {
    getUserCollections,
    removeUserCollection,
    updateUserCollection
} from "../controllers/workoutCollectionsControllers.js";

const collectionsRouter = express.Router()

// get user's collections
collectionsRouter.route('/collections').get(getUserCollections)
// update user's collection name
collectionsRouter.route('/collections/:collectionId/title').patch(updateUserCollection)

// remove a collection from user
collectionsRouter.route('/collections/:collectionId').delete(removeUserCollection)


export default collectionsRouter