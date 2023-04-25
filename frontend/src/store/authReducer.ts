import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const authReducer = createSlice({
  name: "auth",
  initialState: {
    isLogin: false,
    routeHistory: "",
  },
  reducers: {
    updateLoginStatus: (state, action: PayloadAction<boolean>) => {
      state.isLogin = action.payload;
    },
    updateRouteHistory: (state, action: PayloadAction<string>) => {
      state.routeHistory = action.payload;
    },
  },
});

export const { updateLoginStatus, updateRouteHistory } = authReducer.actions;
export default authReducer;
