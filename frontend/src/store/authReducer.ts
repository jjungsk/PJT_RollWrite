import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const authReducer = createSlice({
  name: "auth",
  initialState: {
    routeHistory: "",
    accessToken: "",
    isLogin: false,
  },
  reducers: {
    updateRouteHistory: (state, action: PayloadAction<string>) => {
      state.routeHistory = action.payload;
    },
    updateAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    updateLoginStatus: (state, action: PayloadAction<boolean>) => {
      state.isLogin = action.payload;
    },
  },
});

export const { updateRouteHistory, updateAccessToken, updateLoginStatus } =
  authReducer.actions;
export default authReducer;
