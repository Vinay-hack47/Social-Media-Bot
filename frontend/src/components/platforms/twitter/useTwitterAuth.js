import { getTwitterAuthUrl } from "./api";

export const useTwitterAuth = () => {
  // Function to start Twitter OAuth flow
  const connect = async () => {
    try {
      const url = await getTwitterAuthUrl();
      window.location.href = url; // Redirect user to Twitter
    } catch (error) {
      // Optionally handle error (show toast, etc.)
      console.error("Failed to get Twitter auth URL", error);
    }
  };

  return { connect };
};