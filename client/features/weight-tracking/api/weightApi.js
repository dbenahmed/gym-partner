import { defaultUrl } from "@/constants/constants";

export const fetchWeights = async (accessToken) => {
  try {
    const response = await fetch(`${defaultUrl}/weight`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch weights");
    }
    const { success, data, message } = await response.json();
    if (!success) {
      throw new Error(message);
    }
    return { success: true, data };
  } catch (error) {
    console.error("Error fetching weights:", error);
    return { success: false, message: error.message };
  }
};

export const fetchLogWeight = async (accessToken, weight, unit) => {
  try {
    const response = await fetch(`${defaultUrl}/weight`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ weight, unit }),
    });

    if (!response.ok) {
      throw new Error("Failed to log weight");
    }

    const { success, message } = await response.json();
    if (!success) {
      throw new Error(message);
    }

    return { success: true, message };
  } catch (error) {
    console.error("Error logging weight:", error);
    return { success: false, message: error.message };
  }
};

export const fetchUpdateWeight = async (accessToken, id, weight, unit) => {
  try {
    const response = await fetch(`${defaultUrl}/weight/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ weight, unit }),
    });
    if (!response.ok) {
      throw new Error("Failed to update weight");
    }
    const { success, message } = await response.json();
    if (!success) {
      throw new Error(message);
    }
    return { success: true, message };
  } catch (error) {
    console.error("Error updating weight:", error);
    return { success: false, message: error.message };
  }
};

export const fetchDeleteWeight = async (accessToken, id) => {
  try {
    const response = await fetch(`${defaultUrl}/weight/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to delete weight");
    }
    const { success, message } = await response.json();
    if (!success) {
      throw new Error(message);
    }
    return { success: true, message };
  } catch (error) {
    console.error("Error deleting weight:", error);
    return { success: false, message: error.message };
  }
};
