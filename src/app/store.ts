import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./features/loginSlice";
import productSlice from "./features/productSlice";

import { useDispatch } from "react-redux";
 const store = configureStore({
    reducer: {
        login : loginSlice ,
        product : productSlice,
    }
});


export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export default store;
