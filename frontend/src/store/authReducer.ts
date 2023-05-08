import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { persistor } from "./store";

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
    resetAuthState: (state) => {
      state.routeHistory = "";
      state.accessToken = "";
      state.isLogin = false;
      persistor.purge();
    },
  },
});

export const {
  updateRouteHistory,
  updateAccessToken,
  updateLoginStatus,
  resetAuthState,
} = authReducer.actions;
export default authReducer;
