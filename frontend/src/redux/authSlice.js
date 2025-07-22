import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    user: "",
    allUser: [],
  },
  reducers: {
    //actions
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setAllUser: (state, action) => {
      state.allUser = action.payload;
    },
  },
});

export const { setLoading } = authSlice.actions;
export const { setUser } = authSlice.actions;
export const { setAllUser } = authSlice.actions;
export default authSlice.reducer;
