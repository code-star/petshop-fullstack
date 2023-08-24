import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "./authApi";
import { RootState } from "../store";
import { Role, User } from "../../types";

export type AuthState = {
  user: User | null;
  role: Role | null;
};
const initialState: AuthState = {
  user: null,
  role: null,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = initialState.user;
      state.role = initialState.role;
    },
    setUser: (state, { payload }) => {
      console.log("setUser", payload);
      state.user = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        state.role = payload;
      },
    );
  },
});

export default slice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;

export const selectCurrentRole = (state: RootState) => state.auth.role;

export const { logout, setUser } = slice.actions;
