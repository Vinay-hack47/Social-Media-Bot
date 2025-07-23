import { setAllUserScheduledPost } from '@/redux/postSlice';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';

const useGetAllUserScheduledPost = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getAllUserScheduledPost = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/v1/schedule/getAllScheduledPost", {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        })
        if (res.data.success) {
          dispatch(setAllUserScheduledPost(res.data.scheduledItems));
        }
      } catch (error) {
        console.log(error);
      }
    }
    getAllUserScheduledPost();
  }, [dispatch])
}

export default useGetAllUserScheduledPost;
