import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

const initialState = {
  routeHistory: "",
  accessToken: "",
  isLogin: false,
  firebaseToken: "",
};
const authReducer = createSlice({
  name: "auth",
  initialState,
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
    updateFirebaseToken: (state, action: PayloadAction<string>) => {
      state.firebaseToken = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => initialState);
  },
});

export const {
  updateRouteHistory,
  updateAccessToken,
  updateLoginStatus,
  updateFirebaseToken,
} = authReducer.actions;
export default authReducer;
