import { defaultUrl } from "./constants";

export const API_ENDPOINTS = {
  // WORKOUT - COLLECTIONS
  WORKOUT_COLLECTIONS: `${defaultUrl}/workout/collections`,
  WORKOUT_COLLECTION_BY_ID: (id: string | number) => `${defaultUrl}/workout/collections/${id}`,

  // WORKOUT - PLANS
  WORKOUT_PLANS: `${defaultUrl}/workout/plans`,
  WORKOUT_PLANS_BY_COLLECTION: (collectionId: string | number) => `${defaultUrl}/workout/plans/${collectionId}`,
  WORKOUT_PLAN_BY_ID: (planId: string | number) => `${defaultUrl}/workout/plans/${planId}`,
  WORKOUT_PLAN_EXERCISES: (planId: string | number) => `${defaultUrl}/workout/plans/${planId}/exercises`,

  // WORKOUT - SESSIONS
  WORKOUT_SESSIONS: `${defaultUrl}/workout/sessions`,
  WORKOUT_SESSION_BY_ID: (sessionId: string | number) => `${defaultUrl}/workout/sessions/${sessionId}`,

  // EXPLORE
  EXPLORE_EXERCISES: `${defaultUrl}/explore/exercises`,
  EXPLORE_MEALS: `${defaultUrl}/explore/meals`,

  // EXERCISE STATISTICS
  EXERCISE_STATISTICS: (exerciseId: string | number) => `${defaultUrl}/exercise/statistics/${exerciseId}`,

  // WEIGHT
  WEIGHT: `${defaultUrl}/weight`,
  WEIGHT_BY_ID: (id: string | number) => `${defaultUrl}/weight/${id}`,

  // AUTH
  AUTH_ME: `${defaultUrl}/auth/me`,

  // MEALS
  MEALS: `${defaultUrl}/meals`,
  MEAL_BY_ID: (id: string | number) => `${defaultUrl}/meals/${id}`,
  MEALS_CUSTOM: `${defaultUrl}/meals/custom`,
};

export default API_ENDPOINTS;
