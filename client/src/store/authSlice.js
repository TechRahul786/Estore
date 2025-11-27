import { createSlice } from "@reduxjs/toolkit";
import { authApi, clearTokens } from "./authApi";

// Load user from localStorage on app start
let storedUser = null;

try {
  const raw = localStorage.getItem("user");

  if (raw && raw !== "undefined" && raw !== "null") {
    storedUser = JSON.parse(raw);
  }
} catch (err) {
  console.warn("Invalid user stored, clearing...");
  localStorage.removeItem("user");
}


const data = {
  user: storedUser || null,
  isAuthenticated: storedUser ? true : false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState:data,

  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      clearTokens();
      localStorage.removeItem("user");
    },
  },

  extraReducers: (builder) => {
    builder

      // LOGIN
      .addMatcher(authApi.endpoints.loginUser.matchPending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addMatcher(authApi.endpoints.loginUser.matchFulfilled, (state, { payload }) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = payload.user;
        localStorage.setItem("user", JSON.stringify(payload.user));
      })

      .addMatcher(authApi.endpoints.loginUser.matchRejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload?.data?.message || "Login failed";
      });

    // GET USER PROFILE (after refresh)
    builder
      .addMatcher(authApi.endpoints.getUserProfile.matchFulfilled, (state, { payload }) => {
        state.user = payload;
        state.isAuthenticated = true;
        localStorage.setItem("user", JSON.stringify(payload));
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
