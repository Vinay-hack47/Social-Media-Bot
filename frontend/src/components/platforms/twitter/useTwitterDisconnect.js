// src/hooks/useTwitterDisconnect.ts
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { setUser } from "@/redux/authSlice"; // Make sure the path is correct

export const useTwitterDisconnect = () => {
  const dispatch = useDispatch();
  const {user} = useSelector((store) => store.auth.user);

  const disconnect = async (platformName) => {
    console.log("disconnect",platformName);
    
    try {
      const res = await axios.get(
        `http://localhost:3000/api/v1/twitter/revoke/${platformName}`,
        {
          headers: {
            "Content-Type": "application/json", // fixed typo
          },
          withCredentials: true,
        }
      );  

      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(setUser(res.data.user)); // update redux store
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to disconnect platform.");
    }
  };

  return { disconnect };
};

export default useTwitterDisconnect;
