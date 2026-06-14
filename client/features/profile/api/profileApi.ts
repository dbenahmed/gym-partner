import { defaultUrl } from "@/constants/constants";

export const fetchUserProfile = async (accessToken: any) => {
  try {
    const response = await fetch(`${defaultUrl}/auth/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user profile");
    }

    const { success, data, message } = await response.json();
    if (!success) {
      return { success: false, message };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return { success: false, message: (error as Error).message };
  }
};

export const fetchUpdateProfile = async (accessToken: any, body: any) => {
  try {
    const response = await fetch(`${defaultUrl}/auth/me`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error("Failed to update profile");
    }

    const { success, message } = await response.json();
    if (!success) {
      return { success: false, message };
    }

    return { success: true, message };
  } catch (error) {
    console.error("Error updating user profile:", error);
    return { success: false, message: (error as Error).message };
  }
};
