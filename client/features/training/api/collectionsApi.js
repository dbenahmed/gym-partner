import { defaultUrl } from "@/constants/constants";

export const fetchGetUserCollections = async (accessToken) => {
  try {
    const response = await fetch(`${defaultUrl}/workout/collections`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch collections");
    }

    const { success, data, message } = await response.json();
    if (!success) {
      return { success: false, message };
    }

    return { success: true, collections: data };
  } catch (error) {
    console.error("Error fetching collections:", error);
    return { success: false, message: error.message };
  }
};

export const fetchCreateCollection = async (accessToken, body) => {
  try {
    const response = await fetch(`${defaultUrl}/workout/collections`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error("Failed to create collection");
    }

    const { success, data, message } = await response.json();
    if (!success) {
      return { success: false, message };
    }

    return { success: true, data, message };
  } catch (error) {
    console.error("Error creating collection:", error);
    return { success: false, message: error.message };
  }
};
