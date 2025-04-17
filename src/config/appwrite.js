import { Client, Account, Databases } from "appwrite";

// Create a new client instance
const client = new Client();

// Configure the client using environment variables
client
  .setEndpoint(process.env.REACT_APP_APPWRITE_ENDPOINT)
  .setProject(process.env.REACT_APP_APPWRITE_PROJECT_ID);

// Create service instances
const account = new Account(client);
const databases = new Databases(client);

// Database configuration from environment variables
const DATABASE_ID = process.env.REACT_APP_APPWRITE_DATABASE_ID;
const COLLECTIONS = {
  USERS: "users",
  WEATHER_DATA: "weather_data",
  CROP_DATA: "crop_data",
};

// Export everything
export { client, account, databases, DATABASE_ID, COLLECTIONS };
