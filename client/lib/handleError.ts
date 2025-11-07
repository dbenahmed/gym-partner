import axios from "axios";
// Handle HTTP ERRORS
export const handleError = (error: Error) => {
  let message = "An unexpected error occurred";
  let success = false;
  let code;
  let status;

  if (axios.isAxiosError(error)) {
    console.log("http axios error handleerror function", error);

    // Axios-specific error handling
    if (error.response) {
      // Server responded with a status other than 2xx
      message =
        error.response.data.message ||
        error.response.statusText ||
        "Server Error";
      status = error.response.status;
      code = error.response.data.code;
    } else if (error.request) {
      // Request was made but no response received
      message = "No response received from server";
      status = 408; // Request Timeout
      code = "NO_RESPONSE";
    } else {
      // Some error happened in setting up the request
      message = error.message || "Request setup error";
      status = 400; // Bad Request
      code = "BAD_REQUEST";
    }
  } else {
    // Non-Axios error (e.g., JavaScript error, network failure)
    message = error.message || "Unknown error";
  }

  return { success, message, status, code };
};
