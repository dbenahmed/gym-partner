// Get a list of all workout collections for the user
import db from "../db/index.js";
import { collections, exercises, plans, plansExercises, schema, users } from "../db/schemas/dev/schema.js";
import { and, eq, exists, sql } from "drizzle-orm";

const verifyPlanOwnership = async (userId, planId) => {
  try {
    const foundPlan = await db.select()
      .from(plans)
      .innerJoin(collections, eq(collections.id, plans.collectionId))
      .innerJoin(users, eq(collections.userId, users.id))
      .where(and(eq(plans.id, planId), eq(users.id, userId)))
      .limit(1)

    return foundPlan.length > 0
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: error.message,
      error: error
    })
  }
}

export const getWorkoutCollections = async (req, res) => {
  try {
    const userId = req.user;

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
      message: "An error occurred while fetching the collections"
    })
  }
};

// Create a new workout collection
export const createWorkoutCollection = async (req, res) => {
  try {
    const user = req.userData
    console.log(user)
    const {
      title,
      description
    } = req.body

    if (
      !!title || !!description
    ) {
      res.status(401).json({
        success: false,
        message: 'Title or Description are not given'
      })
    }

    // verify collection title does not exist
    const exists = await db.select().from(collections).where(
      and(
        eq(collections.title, title),
        eq(collections.userId, user.id)
      )
    ).limit(1)
    if (exists.length > 0) {
      res.status(400).json({
        success: false,
        message: "Collection title already used"
      })
    }

    console.log(user.id)
    const inserted = await db.insert(collections).values({ title, description, userId: user.id }).returning({
      id: collections.id, title: collections.title, description: collections.description, userId: collections.userId
    })

    res.status(201).json({
      success: true,
      message: 'Collection created successfully',
      data: {
        ...inserted[0]
      }
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error creating workout collection', error: error.message });
  }
};

// Update a collection's name
export const updateWorkoutCollection = async (req, res) => {
  try {
    const user = req.userData;
    const { collectionId } = req.params
    const { title, description } = req.body

    // at least title or description is given
    if (
      (!!title)
      &&
      (!!description)
    ) {
      res.status(400).json({
        success: false,
        message: "no data is given to update"
      })
    }

    // collection id is given in the request
    if (!collectionId) {
      return res.status(400).json({ success: false, message: "Collection ID is required" });
    }

    // the collection does exist and user is authorized to update it
    const collectionExists = await db.select().from(collections).where(
      and(eq(collections.id, collectionId), eq(collections.userId, user.id))
    ).limit(1)
    if (collectionExists.length === 0) {
      return res.status(404).json({ success: false, message: "Collection does not exist" });
    }

    // remove the undefined or null data ( not included in the body => not changed )
    const newData = Object.fromEntries(Object.entries({ title, description }).filter((v, i) => v !== (undefined || null)))


    // update the collection infos
    const updated = await db.update(collections).set(newData)
      .where(and(eq(collections.id, collectionId), eq(collections.userId, user.id)))
      .returning({
        id: collections.id,
        title: collections.title,
        descriptions: collections.description
      })
    res.status(202).json({
      success: true,
      data: updated[0],
      message: "Updated Collection Title Successfully"
    })
  } catch (e) {
    res.status(400).json({
      success: false,
      errors: e.message,
      message: "An error occurred while updating the collection"
    })
  }
};

// Delete a collection
export const deleteWorkoutCollection = async (req, res) => {
  try {
    const userId = req.user;
    const { collectionId } = req.params

    // verify if the collection id is given in the request
    if (!collectionId) {
      return res.status(400).json({ success: false, message: "Collection ID is required" });
    }

    // verify if the collection does exist and user is authorized
    const collectionExists = await db.select().from(collections).where(
      and(eq(collections.id, collectionId), eq(collections.userId, userId))
    ).limit(1)
    if (collectionExists.length === 0) {
      return res.status(401).json({ success: false, message: "Collection does not exist or user is unauthorized" });
    }

    await db.delete(collections).where(
      and(
        eq(collections.id, collectionId),
        eq(collections.userId, userId)
      )
    )
    res.status(202).json({
      success: true,
      message: "Removed Collection Successfully"
    })
  } catch (e) {
    res.status(400).json({
      success: false,
      errors: e.message,
      message: "An error occurred while updating the collection"
    })
  }
};

// Get a list of all workout plans across collections
export const getWorkoutPlans = async (req, res) => {
  try {
    const userId = req.user;
    const user = req.userData
    const {
      collectionId
    } = req.body

    // check if this collections exists and user authorized
    const foundCollections = await db.select().from(collections).where(
      and(
        eq(collections.id, collectionId),
        eq(collections.userId, userId)
      )
    ).limit(1)
    if (foundCollections.length === 0) {
      res.status(401).json({
        success: false,
        message: 'Collection does not exist or user is unauthorized'
      })
    }

    // response with the plans of this collection
    const foundPlans = await db.select({
      id: plans.id,
      collectionId: plans.collectionId,
      title: plans.title
    }).from(plans).where(eq(plans.collectionId, collectionId))

    res.status(200).json({
      success: true,
      data: foundPlans
    })
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving workout plans', error: error.message });
  }
};

// Create a new workout plan inside a collection
export const createWorkoutPlan = async (req, res) => {
  try {
    // get collection id and userid and user data
    const userId = req.user;
    const { collectionId, title } = req.body

    // check if collection exists and is created by that user ( user authorized )
    const collectionsFound = await db.select().from(collections).where(
      and(
        eq(collections.id, collectionId),
        eq(collections.userId, userId)
      )
    ).limit(1)
    if (collectionsFound.length === 0) {
      res.status(409).json({
        success: false,
        message: 'Collection does not exist or used is not authorized'
      })
    }

    // check if plan already exists before ( name exists )
    const foundPlans = await db.select().from(plans).where(
      and(
        eq(plans.title, title),
        eq(plans.collectionId, collectionId)
      )
    )
    if (foundPlans.length > 0) {
      res.status(409).json({
        success: false,
        message: 'plan name already used before'
      })
    }

    // create a new plan empty
    const inserted = await db.insert(plans).values({
      title,
      collectionId
    }).returning({
      id: plans.id,
      title: plans.title,
      collectionId: plans.collectionId
    })
    // ... existing code ...
    res.status(201).json({
      success: true,
      message: 'Plan created successfully',
      data: inserted[0]
    })
  } catch (error) {
    res.status(500).json({ message: 'Error creating workout plan', error: error.message });
  }
};

// Get details of a specific workout plan
export const getWorkoutPlanDetails = async (req, res) => {
  try {
    const userId = req.user;
    // ... existing code ..
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving workout plan details', error: error.message });
  }
};

// ! doing Update a workout plan's name or collection
export const updateWorkoutPlan = async (req, res) => {
  try {
    const userId = req.user;
    const { title } = req.body
    const { planId } = req.params

    // check if new title is given
    if (title === (null || undefined)) {
      res.status(400).json({
        success: false,
        message: "no data is given to update"
      })
    }
    const newData = { title }
    // planId is given in request 
    if (!planId) {
      return res.status(400).json({ success: false, message: "Plan ID is required" });
    }

    // the plan does exist and user is authorized to update it
    const authorized = await verifyPlanOwnership(userId, planId)
    if (!authorized) {
      res.status(401).json({
        success: false,
        message: 'User not authorized or plan does not exists'
      })
    }

    const updated = await db.update(plans).set(newData).where(eq(plans.id, planId)).returning({
      id: plans.id,
      title: plans.title,
      collectionId: plans.collectionId
    })
    res.status(200).json({
      success: true,
      message: 'Plan updated successfully',
      data: updated[0]
    })


  } catch (error) {
    res.status(500).json({ message: 'Error updating workout plan', error: error.message });
  }
};

// Delete a workout plan
export const deleteWorkoutPlan = async (req, res) => {
  try {
    const userId = req.user;
    const { planId } = req.params;

    const authorized = await verifyPlanOwnership(userId, planId)
    if (!authorized) {
      res.status(401).json({
        success: false,
        message: 'User unauthorized or plan does not exist'
      })
    }
    await db.delete(plans).where(
      eq(plans.id, planId)
    )

    res.status(200).json({
      success: true,
      message: 'Plan deleted successfully'
    })
  } catch (error) {
    res.status(500).json({ message: 'Error deleting workout plan', error: error.message });
  }
};

// Add an exercise to a workout plan
export const addExerciseToPlan = async (req, res) => {
  try {
    const userId = req.user;
    const userData = req.userData;
    const { planId } = req.params
    const { exerciseId } = req.body

    // find the plan if exists
    // check if the plan created by the user ( authorized to add exercise to it )
    const foundPlans = await db.select().from(plans).where(eq(plans.id, planId))
      .innerJoin(collections, and(eq(plans.collectionId, collections.id), eq(collections.userId, userId)))
    const plan = foundPlans[0]
    // get the exercise id and verify it exists in the db
    const foundExercises = await db.select().from(exercises).where(eq(exercises.id, exerciseId)).limit(1)
    if (foundExercises.length === 0) {
      res.status(401).json({
        success: false,
        message: "Exercise does not exist"
      })
    }
    const exercise = foundExercises[0]

    // verify if this exercise is not already inside of this plan
    const exerciseNotAlreadyAdded = await db.select().from(plansExercises).where(and(
      eq(plansExercises.planId, planId),
      eq(plansExercises.exerciseId, exerciseId)
    )).limit(1)
    if (exerciseNotAlreadyAdded.length > 0) {
      res.status(401).json({
        success: false,
        message: "Exercise already exists in this plan"
      })
    }

    // todo : get maximum order to insert the exercise above

    // add the exercise to the plan
    await db.insert(plansExercises).values({
      planId,
      exerciseId,
      order: 0
    })

    res.json({
      success: true,
      message: "Exercise successfully added to the plan"
    })



  } catch (error) {
    console.log("")
    console.log("")
    console.log("")
    console.error(error)
    res.status(500).json({ message: 'Error adding exercise to plan', error: error.message });
  }
};

// Update an exercise in a workout plan
export const updateExerciseInPlan = async (req, res) => {
  try {
    const userId = req.user;
    // ... existing code ...
  } catch (error) {
    res.status(500).json({ message: 'Error updating exercise in plan', error: error.message });
  }
};

// Remove an exercise from a workout plan
export const removeExerciseFromPlan = async (req, res) => {
  try {
    const userId = req.user;
    const userData = req.userData;
    const { planId, exerciseId } = req.params

    // find the plan if exists
    // check if the plan created by the user ( authorized to add exercise to it )
    const foundPlans = await db.select().from(plans).where(eq(plans.id, planId))
      .innerJoin(collections, and(eq(plans.collectionId, collections.id), eq(collections.userId, userId)))
    const plan = foundPlans[0]

    // verify if this exercise is not inside of this plan
    const exerciseNotAlreadyAdded = await db.select().from(plansExercises).where(and(
      eq(plansExercises.planId, planId),
      eq(plansExercises.exerciseId, exerciseId)
    )).limit(1)
    if (exerciseNotAlreadyAdded.length = 0) {
      res.status(401).json({
        success: false,
        message: "Exercise does not exist in this plan"
      })
    }

    // remove the exercise to the plan
    await db.delete(plansExercises).where(and(
      eq(plansExercises.planId, planId),
      eq(plansExercises.exerciseId, exerciseId)
    ))

    res.json({
      success: true,
      message: "Exercise successfully removed from the plan"
    })

  } catch (error) {
    res.status(500).json({ message: 'Error removing exercise from plan', error: error.message });
  }
};