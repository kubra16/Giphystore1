import { configureStore } from "@reduxjs/toolkit";
import gifsSlice from "./gifsSlice";

export const store = configureStore({
  reducer: {
    gifs: gifsSlice,
  },
});
