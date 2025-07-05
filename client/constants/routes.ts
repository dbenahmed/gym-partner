export default {
  ROOT: "/",
  // AUTH
  NOT_FOUND: "/not-found",
  AUTH_CONTEXT: "/contex/authcontex",
  SIGN_UP: "/(auth)/signUp",
  SIGN_IN: "/(auth)/signIn",
  LANDING: "/(auth)/landing",

  // GYM
  PROTECTED_COLLECTIONS: "/(protected)/training/collections",
  PROTECTED_COLLECTION_PLANS: "/(protected)/training/collections/:collectionId",
  PROTECTED_COLLECTION_PLAN_EXERCISES:
    "/(protected)/training/collections/:collectionId/:planId",
  PROTECTED_EXERCISE_DETAILS: "/(protected)/Explore/exercise",

  PROTECTED_SESSIONS: "(protected)/training/sessions",
  PROTECTED_SESSION_DETAILS: "(protected)/training/sessions/:sessionId",
  PROTECTED_NEW_SESSION: "(protected)/training/sessions/newSession",
  // FOOD
  PROTECTED_MEALS: "/(protected)/mealsHome",
  PROTECTED_FOOD_DETAILS: "/(protected)/Explore/meals",

  // MISC
  PROTECTED_HOME: "/(protected)/Profile", //"/(protected)/home",
  PROTECTED_PROFILE: "/(protected)/Profile",
  PROTECTED_PROFILE_BODY_WEIGHT_TRACKING:
    "/(protected)/Profile/body-weight-tracking",
};
