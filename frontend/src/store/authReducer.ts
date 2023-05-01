import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const authReducer = createSlice({
  name: "auth",
  initialState: {
    routeHistory: "",
    accessToken: "",
  },
  reducers: {
    updateRouteHistory: (state, action: PayloadAction<string>) => {
      state.routeHistory = action.payload;
    },
    updateAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
  },
});

export const { updateRouteHistory, updateAccessToken } = authReducer.actions;
export default authReducer;
