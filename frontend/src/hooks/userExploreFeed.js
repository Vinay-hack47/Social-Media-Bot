// src/hooks/useExploreFeed.js
import { useState } from "react";
import axios from "axios";

const useExploreFeed = (feedType = "all") => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token"); // or get from context

  const fetchFeed = async () => {
    try {
      setLoading(true);
      const endpoint =
        feedType === "following"
          ? "/api/v1/user/following/posts"
          : "/api/v1/post/explore";

      const res = await axios.get(endpoint, {
        params: { page, limit: 5 },
        headers: { Authorization: `Bearer ${token}` },
      });

      if (page === 1) {
        setPosts(res.data.posts);
      } else {
        setPosts((prev) => [...prev, ...res.data.posts]);
      }

      setHasMore(res.data.posts.length > 0);
    } catch (err) {
      console.error("Error fetching feed:", err);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    setPage((prev) => prev + 1);
  };

  const likePost = async (postId) => {
    try {
      await axios.post(
        `/api/v1/post/${postId}/like`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setPosts((prev) =>
        prev.map((p) =>
          p._id === postId
            ? {
                ...p,
                likes: p.likes + 1,
                likedBy: [...p.likedBy, "self"],
              }
            : p
        )
      );
    } catch (err) {
      console.error("Error liking post:", err);
    }
  };

  const deletePost = async (postId) => {
    try {
      await axios.delete(`/api/v1/post/${postId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts((prev) => prev.filter((p) => p._id !== postId));
    } catch (err) {
      console.error("Error deleting post:", err);
    }
  };

  return {
    posts,
    loading,
    hasMore,
    fetchFeed,
    loadMore,
    likePost,
    deletePost,
  };
};

export default useExploreFeed;
