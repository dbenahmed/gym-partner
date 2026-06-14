import { defaultUrl } from "@/constants/constants";

export const fetchExploreExercises = async (accessToken: any, queryParams: any) => {
  try {
    const searchParams = new URLSearchParams(queryParams);
    const response = await fetch(`${defaultUrl}/explore/exercises?${searchParams.toString()}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const { success, data, message, error } = await response.json();
    if (!success) {
      return { success: false, message: error || message };
    }
    return { success: true, exercises: data.exercises };
  } catch (error) {
    console.error("Error fetching exercises:", error);
    return { success: false, message: (error as Error).message };
  }
};

export const fetchExploreFoods = async (accessToken: any, query: any) => {
  try {
    const queries = { name: query };
    const searchParams = new URLSearchParams(queries);
    const response = await fetch(`${defaultUrl}/explore/meals?${searchParams.toString()}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const { success, meals, message } = await response.json();
    if (!success) {
      return { success: false, message };
    }
    return { success: true, foods: meals };
  } catch (error) {
    console.error("Error fetching foods:", error);
    return { success: false, message: (error as Error).message };
  }
};
