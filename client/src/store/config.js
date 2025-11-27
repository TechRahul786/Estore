import { configureStore } from "@reduxjs/toolkit";
import navSlice from "./navSlice.js";
import {productApi} from "./service.js";
import cartSlice from "./cartSlice.js";
import authSlice from "./authSlice.js";
import { authApi } from "./authApi.js";

const store = configureStore({
  reducer: {
    navController: navSlice,
    cartState: cartSlice,
    auth: authSlice,
    [authApi.reducerPath]: authApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([productApi.middleware, authApi.middleware]),
});

export default store;
