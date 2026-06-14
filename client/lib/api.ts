import { defaultUrl } from "@/constants/constants";



export const fetchGetUserCollections = async (accessToken: any) => {
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
  collectionId: any;
};

export const fetchGetUserPlans = async (
  accessToken: any,
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
  title: any;
  description: any;
};

export const fetchCreateCollection = async (
  accessToken: any,
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
  title: any;
  collectionId: any;
};

export const fetchCreatePlan = async (
  accessToken: any,
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
  planId: any;
};

export const fetchGetPlanExercises = async (
  accessToken: any,
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
  planId: any;
  exercisesIds: any[];
};

export const fetchAddExerciseToPlan = async (
  accessToken: any,
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
  query: any;
  limit: any;
};

export const fetchSearchExercises = async (
  accessToken: any,
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



export const fetchDeletePlan = async (accessToken: any, planId: any) => {
  try {
    const url = `${defaultUrl}/workout/plans/${planId}`;
    const res = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!res.ok) {
      throw new Error("Failed to delete plan");
    }
    const { success, message } = await res.json();
    if (!success) {
      throw new Error(message);
    }
    return {
      success: true,
      message: message,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const fetchDeleteCollection = async (
  accessToken: any,
  collectionId: any
) => {
  try {
    const url = `${defaultUrl}/workout/collections/${collectionId}`;
    const res = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!res.ok) {
      throw new Error("Failed to delete collection");
    }
    const { success, message } = await res.json();
    if (!success) {
      throw new Error(message);
    }
    return {
      success: true,
      message: message,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const fetchCreateExercise = async (accessToken: any, body: any) => { return { success: true, message: 'Success' }; };
