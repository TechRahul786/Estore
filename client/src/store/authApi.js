import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// ---- Load Tokens From LocalStorage ----
const getAccessToken = () => localStorage.getItem("accessToken");
const getRefreshToken = () => localStorage.getItem("refreshToken");

// ---- Save Tokens To LocalStorage ----
const saveTokens = ({ accessToken, refreshToken }) => {
  if (accessToken) localStorage.setItem("accessToken", accessToken);
  if (refreshToken) localStorage.setItem("refreshToken", refreshToken);
};

// ---- Remove Tokens (Logout) ----
export const clearTokens = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};

// ---- Create Base Query ----
const baseQuery = fetchBaseQuery({
  baseUrl: "https://dummyjson.com",
  prepareHeaders: (headers) => {
    const token = getAccessToken();
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

// ---- Handle Refresh Token Logic ----
const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);


  // If token expired (401)
  if (result.error && result.error.status === 401) {
    const refreshToken = getRefreshToken();
    if (!refreshToken) {
      clearTokens();
      return result;
    }

    // Try refreshing token
    const refreshResult = await baseQuery(
      {
        url: "/auth/refresh",
        method: "POST",
        body: { token: refreshToken },
      },
      api,
      extraOptions
    );

    if (refreshResult.data) {
      // Save new tokens
      saveTokens(refreshResult.data);

      // Retry original request with new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      clearTokens(); // Refresh failed → logout
    }
  }

  return result;
};

// ---- AUTH API ----
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    //login
    loginUser: builder.mutation({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          saveTokens(data); // Save tokens after login
        } catch (err) {
        }
      },
    }),

    //register
    registerUser: builder.mutation({
      query: (userData) => ({
        url: "/auth/register",
        method: "POST",
        body:userData,                          
      }),
    }),

    //get profile
    getUserProfile: builder.query({
      query: () => "/auth/me",
    }),
  }),
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useGetUserProfileQuery,
} = authApi;
