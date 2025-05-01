import { defaultUrl } from "@/constants/constants";

export const fetchAddFoodToUser = async (
  date: String,
  foodId: Number,
  description: String,
  servingSize: Number,
  accessToken: String
) => {
  try {
    const url = `${defaultUrl}/meals`;
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        date,
        foodId,
        description,
        servingSize,
      }),
    });
    if (!res.ok) {
      throw new Error("Failed to add food to user");
      return;
    }
    const data = await res.json();
    if (!data.success) {
      throw new Error(data.message);
      return;
    }
    return {
      success: true,
      message: data.insertedFood,
    };
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: error.message,
    };
  }
};

type SearchFoodBodyType = {
  name: String;
};

export const fetchSearchFood = async (
  accessToken: String,
  body: SearchFoodBodyType
) => {
  try {
    const url = `${defaultUrl}/explore/meals?name=${body.name}`;
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch food");
    }
    const data = await res.json();
    if (!data.success) {
      return {
        success: false,
        error: data.message,
      };
    }
    return {
      success: true,
      meals: data.meals,
    };
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      error: error.message,
    };
  }
};

export const fetchGetUserCollections = async (accessToken: String) => {
  try {
    const url = `${defaultUrl}/workout/collections`;
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch collections");
    }
    const { success, message, data } = await res.json();
    if (!success) {
      throw new Error(message);
    }
    return {
      success: true,
      collections: data,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

type GetPlanBodyType = {
  collectionId: Number;
};

export const fetchGetUserPlans = async (
  accessToken: String,
  body: GetPlanBodyType
) => {
  try {
    const url = `${defaultUrl}/workout/plans/${body.collectionId}`;
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch plans");
    }
    const { success, message, data } = await res.json();
    if (!success) {
      throw new Error(message);
    }
    return {
      success: true,
      message: message,
      plans: data,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

type CreateCollectionBodyType = {
  title: String;
  description: String;
};

export const fetchCreateCollection = async (
  accessToken: String,
  body: CreateCollectionBodyType
) => {
  try {
    const url = `${defaultUrl}/workout/collections`;
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      throw new Error("Failed to create collection");
    }
    const { success, message, data } = await res.json();
    if (!success) {
      throw new Error(message);
    }
    return {
      success: true,
      message: message,
      data: data,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

type CreatePlanBodyType = {
  title: String;
  collectionId: Number;
};

export const fetchCreatePlan = async (
  accessToken: String,
  body: CreatePlanBodyType
) => {
  try {
    const url = `${defaultUrl}/workout/plans`;
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      throw new Error("Failed to create plan");
    }
    const { success, message, data } = await res.json();
    if (!success) {
      throw new Error(message);
    }
    return {
      success: true,
      message: message,
      data: data,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

type GetPlanExercisesBodyType = {
  planId: Number;
};

export const fetchGetPlanExercises = async (
  accessToken: String,
  body: GetPlanExercisesBodyType
) => {
  try {
    const url = `${defaultUrl}/workout/plans/${body.planId}/exercises`;
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch exercises for plan");
    }
    const { success, message, data } = await res.json();
    if (!success) {
      throw new Error(message);
    }
    return {
      success: true,
      message: message,
      data: data,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

type AddExerciseBodyType = {
  planId: Number;
  exercisesIds: Number[];
};

export const fetchAddExerciseToPlan = async (
  accessToken: String,
  body: AddExerciseBodyType
) => {
  try {
    const url = `${defaultUrl}/workout/plans/${body.planId}/exercises`;
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ exercisesIds: body.exercisesIds }),
    });
    if (!res.ok) {
      throw new Error("Failed to add exercise to plan");
    }
    const { success, message, data } = await res.json();
    if (!success) {
      throw new Error(message);
    }
    return {
      success: true,
      message: message,
      data: data,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

type SearchExercisesBodyType = {
  query: String;
  limit: Number;
};

export const fetchSearchExercises = async (
  accessToken: String,
  body: SearchExercisesBodyType
) => {
  try {
    const url = `${defaultUrl}/explore/exercises?name=${body.query}&limit=${body.limit}`;
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error("Failed to search exercises");
    }
    const { success, message, data } = await res.json();
    console.log(success, message, data);
    if (!success) {
      throw new Error(message);
    }
    return {
      success: true,
      message: message,
      data: data,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

type CreateCustomMealBodyType = {
  foodname: String;
  calories: Number;
  proteinper100g: Number;
  carbohydratesper100g: Number;
  fatper100g: Number;
};
export const fetchCreateCustomMeal = async (
  accessToken: String,
  body: CreateCustomMealBodyType
) => {
  try {
    console.log('adding custom food now')
    const url = `${defaultUrl}/meals/custom`;
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      throw new Error("Failed to create custom meal");
    }
    const { success, message, data } = await res.json();
    console.log(success)
    if (!success) {
      throw new Error(message);
    }
    return {
      success: true,
      message: message,
      createdMeal: data,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};
