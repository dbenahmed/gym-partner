import { defaultUrl } from "@/constants/constants";

export const fetchSearchFood = async (accessToken: any, body: any) => {
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
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: (error as Error).message,
    };
  }
};

export const fetchCreateCustomMeal = async (accessToken: any, body: any) => {
  try {
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
      throw new Error("Server Error: Failed to create custom meal");
    }
    const { success, message, data } = await res.json();
    if (!success) {
      throw new Error(message);
    }
    return {
      success: true,
      message: message,
      createdMeal: data,
    };
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message,
    };
  }
};
