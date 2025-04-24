import Constants from "expo-constants";
const url = Constants.expoConfig?.extra?.BACKEND_URL;
const port = Constants.expoConfig?.extra?.PORT;

// export const defaultUrl = `${url}:${port}`;
export const defaultUrl = `${url}`;
