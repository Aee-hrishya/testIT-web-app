import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    isAuthenticated: null,
    user: {
      id: null,
      username: null,
    },
  },
  reducers: {
    setUser(state, action) {
      state.isAuthenticated = action.payload.token;
      state.user.id = action.payload.user.id;
      state.user.username = action.payload.user.username;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
