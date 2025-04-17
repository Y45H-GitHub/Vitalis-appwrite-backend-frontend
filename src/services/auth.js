import { account } from "../config/appwrite";
import { ID } from "appwrite";

export const authService = {
  // Create a new user account
  createAccount: async (email, password, name) => {
    try {
      const user = await account.create(ID.unique(), email, password, name);
      return user;
    } catch (error) {
      throw error;
    }
  },

  // Login user
  // Login user (force logout if already logged in)
  login: async (email, password) => {
    try {
      // Clear any existing session before login
      await account.deleteSession("current");
    } catch (err) {
      if (err.message !== "Session not found") {
        console.log("Error clearing session:", err.message);
      }
    }

    // Now create a new session
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  },

  // Get current user
  getCurrentUser: async () => {
    try {
      const user = await account.get();
      return user;
    } catch (error) {
      console.error("Get current user error:", error);
      return null;
    }
  },

  // Logout user
  logout: async () => {
    try {
      await account.deleteSession("current");
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  },

  // Check if user is logged in
  isLoggedIn: async () => {
    try {
      const user = await account.get();
      return !!user;
    } catch (error) {
      return false;
    }
  },
};
