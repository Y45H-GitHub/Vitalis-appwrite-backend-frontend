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

// Collection IDs (use actual collection IDs here)
const COLLECTIONS = {
  USERS: "68007efe000a6038fe8b", // Collection ID for 'users'
  WEATHER_DATA: "68007f070027caecd941", // Collection ID for 'weather_data'
  CROP_DATA: "68007f35001f551f5b03", // Collection ID for 'crop_data'
};

// Export everything
export { client, account, databases, DATABASE_ID, COLLECTIONS };
