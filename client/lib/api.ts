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
export const fetchSearchFood = async (text: String) => {
  try {
    const url = `${defaultUrl}/explore/meals?name=${text}`;
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
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
