// src/hooks/useExploreFeed.js
import { useSelector, useDispatch } from "react-redux";
import { setAllPosts, setPostOfFollowings } from "@/redux/postSlice";
import axios from "axios";
import { useEffect, useState } from "react";

const useExploreFeed = (feedType = "all") => {
  const dispatch = useDispatch();
  const allPosts = useSelector((state) => state.post.allPosts);
  const followingPosts = useSelector((state) => state.post.postOfFollowings);
  const [loading, setLoading] = useState(true);

  const fetchFeed = async () => {
    setLoading(true);
    try {
      if (feedType === "all") {
        const res = await axios.get("http://localhost:3000/api/v1/posts/allPosts", {
          withCredentials: true,
        });
        if (res.data.success) dispatch(setAllPosts(res.data.posts));
      } else {
        const res = await axios.get("http://localhost:3000/api/v1/posts/postOfFollowings", {
          withCredentials: true,
        });
        if (res.data.success) dispatch(setPostOfFollowings(res.data.posts));
      }
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, [feedType, dispatch]);

  return {
    posts: feedType === "all" ? allPosts : followingPosts,
    loading,
    refetch: fetchFeed,
  };
};

export default useExploreFeed;
