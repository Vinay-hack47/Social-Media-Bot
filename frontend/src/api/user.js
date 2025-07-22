import axios from "axios";
export const fetchCurrentUser = async () => {
  const res = await axios.get("http://localhost:3000/api/v1/user/me", { withCredentials: true });
  return res.data.user;
};