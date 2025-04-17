import { databases, DATABASE_ID, COLLECTIONS } from "../config/appwrite";
import { ID, Query } from "appwrite";

export const dataService = {
  // Save weather data
  saveWeatherData: async (data) => {
    try {
      const response = await databases.createDocument(
        DATABASE_ID, // Use the correct DATABASE_ID
        COLLECTIONS.WEATHER_DATA, // The correct collection ID for weather data
        data
      );
      return response;
    } catch (error) {
      console.error("Error saving weather data:", error);
      throw error;
    }
  },

  // Get weather data
  getWeatherData: async (limit = 10) => {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTIONS.WEATHER_DATA,
        [Query.orderDesc("timestamp"), Query.limit(limit)]
      );
      return response.documents;
    } catch (error) {
      throw error;
    }
  },

  // Save crop data
  saveCropData: async (data) => {
    try {
      const response = await databases.createDocument(
        DATABASE_ID,
        COLLECTIONS.CROP_DATA,
        ID.unique(),
        {
          ...data,
          timestamp: new Date().toISOString(),
        }
      );
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get crop data
  getCropData: async (limit = 10) => {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTIONS.CROP_DATA,
        [Query.orderDesc("timestamp"), Query.limit(limit)]
      );
      return response.documents;
    } catch (error) {
      throw error;
    }
  },
};
