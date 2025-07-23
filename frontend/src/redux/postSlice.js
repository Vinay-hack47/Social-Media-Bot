import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "post",
  initialState: {
    postOfFollowings: [],
    allPosts: [],
    allUserScheduledPost : []
  },
  reducers: {
    //actions
    setPostOfFollowings: (state, actions) => {
      state.postOfFollowings = actions.payload;
    },
    setAllPosts: (state, actions) => {
      state.allPosts = actions.payload;
    },
    setAllUserScheduledPost: (state, actions) => {
      state.allUserScheduledPost = actions.payload;
    },
  }
});

export const {setPostOfFollowings} = postSlice.actions;
export const {setAllPosts} = postSlice.actions;
export const {setAllUserScheduledPost} = postSlice.actions;
export default postSlice.reducer;
