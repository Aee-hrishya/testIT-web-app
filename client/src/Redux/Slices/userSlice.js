import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    isAuthenticated: null,
    user: {
      id: null,
      username: null,
      role: null,
    },
  },
  reducers: {
    setUser(state, action) {
      state.isAuthenticated = action.payload.token ?? state.isAuthenticated;
      state.user.id = action.payload.user?.id ?? state.user.id;
      state.user.username =
        action.payload.user?.username ?? state.user.username;
      state.user.role = action.payload.user?.role ?? state.user.role;
    },
    clearUser(state) {
      state.isAuthenticated = null;
      state.user = {
        id: null,
        username: null,
        role: null,
      };
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
