import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { petShopApi } from "./services/petShopApi";
import { authApi } from "./services/authApi";
import authReducer from "./services/authSlice";

export type RootState = ReturnType<typeof store.getState>;

export const store = configureStore({
  reducer: {
    [petShopApi.reducerPath]: petShopApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(petShopApi.middleware, authApi.middleware),
});

setupListeners(store.dispatch);
