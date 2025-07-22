import { setPostOfFollowings } from '@/redux/postSlice';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';

const useGetAllPostOfFollowings = () => {
  const dispatch = useDispatch();
   
  useEffect(() =>{
    const getPostOfFollowings = async() =>{
      try {
        const res = await axios.get("http://localhost:3000/api/v1/posts/postOfFollowings", {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }) 
        if(res.data.success){
         
            dispatch(setPostOfFollowings(res.data.posts));
        }
      } catch (error) {
        console.log(error);
      }
    }
    getPostOfFollowings();
  },[dispatch])
}

export default useGetAllPostOfFollowings;
