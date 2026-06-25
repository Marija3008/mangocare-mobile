//export const API_BASE_URL = "http://localhost:5108/api";

//on Iphone
// export const API_BASE_URL = "http://192.168.1.100:5108/api";

import Constants from "expo-constants";
import { Platform } from "react-native";

const API_PORT = "5108";
const API_PATH = "/api";

function getExpoHostIp() {
  const hostUri = 
    Constants.expoConfig?.hostUri ??
    (Constants as any).manifest?.debuggerHost ??
    (Constants as any).manifest2?.extra?.expoClient?.hostUri;

    if (!hostUri) {
      return null;
    }

    return hostUri.split(":")[0];
}

function getLocalApiBaseUrl() {
  if (Platform.OS === "web") {
    return `http://localhost:${API_PORT}${API_PATH}`;
  } 

  const expoHostIp = getExpoHostIp();

  if (!expoHostIp) {
    return `http://localhost:${API_PORT}${API_PATH}`;
  }

  return `http://${expoHostIp}:${API_PORT}${API_PATH}`;
}

export const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL ?? getLocalApiBaseUrl();



  //Expo Web on laptop → http://localhost:5108/api
//Expo Go on phone   → automatically uses laptop IP from Expo