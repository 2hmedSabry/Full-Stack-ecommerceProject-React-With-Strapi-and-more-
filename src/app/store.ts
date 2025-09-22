import { configureStore } from "@reduxjs/toolkit";
import { persistReducer , persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import globalSlice from "./features/globalSlice";
import loginSlice from "./features/loginSlice";
import productSlice from "./features/productSlice";
import cartSlice from "./features/cartSlice";

import { useDispatch } from "react-redux";

    const persistCartConfig  = {
        key : 'cart',
        storage
    }

const persistedCart = persistReducer(persistCartConfig , cartSlice)


 const store = configureStore({
    reducer: {
        login : loginSlice ,
        cart : persistedCart,
        product : productSlice,
        global : globalSlice

    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false 
    })
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();



export const persister = persistStore(store)


export default store;
