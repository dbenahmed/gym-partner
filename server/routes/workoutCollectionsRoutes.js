import express from "express";
import {
    getUserCollections,
    removeUserCollection,
    updateUserCollection
} from "../controllers/workoutCollectionsControllers.js";
import authMiddleware from '../middleware/authMiddlewares.js';

const collectionsRouter = express.Router()

// get user's collections
collectionsRouter.route('/collections').get(authMiddleware, getUserCollections)
// update user's collection name
collectionsRouter.route('/collections/:collectionId/title').patch(authMiddleware, updateUserCollection)

// remove a collection from user
collectionsRouter.route('/collections/:collectionId').delete(authMiddleware, removeUserCollection)


export default collectionsRouter