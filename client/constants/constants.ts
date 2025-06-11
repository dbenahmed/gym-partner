import Constants from "expo-constants";
const url = Constants.expoConfig?.extra?.BACKEND_URL;
const port = Constants.expoConfig?.extra?.PORT;

console.log("requests are going to", url, "on port", port);

export const defaultUrl = `${url}`;
//export const defaultUrl = `https://gym-partner-production.up.railway.app`;
