import { createSlice } from "@reduxjs/toolkit";

const storedToken = localStorage.getItem("token");
const initialState = {
  isLoggedIn: storedToken ? true : false,
  token: storedToken,
};

const authSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
      if (state.token !== null) {
        state.isLoggedIn = true;
        localStorage.setItem("token", state.token);
      } else {
        state.isLoggedIn = false;
        localStorage.removeItem("token");
      }
    },
  },
});

export default authSlice;
export const authActions = authSlice.actions;
