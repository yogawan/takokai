import { configureStore } from "@reduxjs/toolkit";
import footerReducer from "./footer/footerSlice";

const store = configureStore({
  reducer: {
    footer: footerReducer,
  },
});

export default store;
