import Constants from "expo-constants";

const settings = {
  dev: {
    apiUrl: "https://asaan.business/api",
    // apiUrl: "http://127.0.0.1:8000/api",
  },
  staging: {
    apiUrl: "https://asaan.business/api",
    // apiUrl: "http://127.0.0.1:8000/api",
  },
  prod: {
    apiUrl: "https://asaan.business/api",
  },
};

const getCurrentSettings = () => {
  if (__DEV__) return settings.dev;
  if (Constants.manifest.releaseChannel === "staging") return settings.staging;
  return settings.prod;
};

export default getCurrentSettings();
