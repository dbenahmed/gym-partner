import axios from "axios";

export const handleError = (error: Error) => {
  let message = "An unexpected error occurred";
  let success = false;

  if (axios.isAxiosError(error)) {
    // Axios-specific error handling
    if (error.response) {
      // Server responded with a status other than 2xx
      message =
        error.response.data.message ||
        error.response.statusText ||
        "Server Error";
    } else if (error.request) {
      // Request was made but no response received
      message = "No response received from server";
    } else {
      // Some error happened in setting up the request
      message = error.message || "Request setup error";
    }
  } else {
    // Non-Axios error (e.g., JavaScript error, network failure)
    message = error.message || "Unknown error";
  }

  return { success, message };
};
