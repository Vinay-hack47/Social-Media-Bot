import { setAllUser } from '@/redux/authSlice';
import { setPostOfFollowings } from '@/redux/postSlice';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';

const useGetAllUser = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getAllUser = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/v1/user/getAllUser", {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        })
        if (res.data.success) {
          dispatch(setAllUser(res.data.users));
        }
      } catch (error) {
        console.log(error);
      }
    }
    getAllUser();
  }, [dispatch])
}

export default useGetAllUser;
