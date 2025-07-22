import { setAllPosts } from "@/redux/postSlice";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const useGetAllPosts = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getAllPost = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:3000/api/v1/posts/allPosts", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setAllPosts(res.data.posts));
      } else {
        setError("Failed to load posts.");
      }
    } catch (error) {
      setError(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllPost();
  }, [dispatch]);

  return { loading, error, refetch: getAllPost }; // Expose refetch
};

export default useGetAllPosts;
