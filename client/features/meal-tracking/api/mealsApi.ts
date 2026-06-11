import { defaultUrl } from "@/constants/constants";

export const fetchUserMealsOnDate = async (accessToken: any, dateStr: any) => {
  try {
    const url = `${defaultUrl}/meals?date=${dateStr}`;
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch meals");
    }
    const json = await res.json();
    if (!json.success) {
      throw new Error(json.message);
    }
    return {
      success: true,
      data: json.data,
    };
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message,
    };
  }
};

export const fetchAddFoodToUser = async (
  date: any,
  foodId: any,
  description: any,
  servingSize: any,
  accessToken: any
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
    }
    const data = await res.json();
    if (!data.success) {
      throw new Error(data.message);
    }
    return {
      success: true,
      message: data.insertedFood,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: (error as Error).message,
    };
  }
};

export const fetchUpdateMeal = async (accessToken: any, id: any, body: any) => {
  try {
    const url = `${defaultUrl}/meals/${id}`;
    const res = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      throw new Error("Failed to update meal");
    }
    const json = await res.json();
    if (!json.success) {
      throw new Error(json.message);
    }
    return {
      success: true,
      message: json.message,
    };
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message,
    };
  }
};

export const fetchDeleteMeal = async (accessToken: any, id: any) => {
  try {
    const url = `${defaultUrl}/meals/${id}`;
    const res = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!res.ok) {
      throw new Error("Failed to delete meal");
    }
    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message,
    };
  }
};
