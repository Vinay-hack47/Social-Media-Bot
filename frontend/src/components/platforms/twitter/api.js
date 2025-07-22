import axios from "axios";

// Get the Twitter OAuth URL from your backend
export const getTwitterAuthUrl = async () => {
  const res = await axios.get("http://localhost:3000/api/v1/twitterAuth/twitter/auth-url", {
    withCredentials: true,
  });
  console.log(res.data);
  
  // Your backend returns { authUrl }
  return res.data.authUrl;
};