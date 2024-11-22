import { configureStore } from "@reduxjs/toolkit";
import cardSlice from "./slices/cardSlice";
import productsSlice from "./slices/productsSlice";
import userSlice from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    card: cardSlice,
    products: productsSlice,
    user: userSlice,
  },
});
