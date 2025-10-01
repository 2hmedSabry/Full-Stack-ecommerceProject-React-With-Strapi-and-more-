import { configureStore } from "@reduxjs/toolkit";
import { persistReducer , persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import globalSlice from "./features/globalSlice";
import loginSlice from "./features/loginSlice";
import registerSlice from "./features/RegisterSlice";
import productSlice from "./features/productSlice";
import cartSlice from "./features/cartSlice";
import networkSlice from './features/networkSlice'

import { useDispatch } from "react-redux";
import { productApiSlice  } from "./services/product";

    const persistCartConfig  = {
        key : 'cart',
        storage
    }

const persistedCart = persistReducer(persistCartConfig , cartSlice)


 const store = configureStore({
    reducer: {
        network : networkSlice,
        login : loginSlice ,
        register : registerSlice,
        cart : persistedCart,
        product : productSlice,
        global : globalSlice,
        [productApiSlice.reducerPath]: productApiSlice.reducer,

    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false 
    }).concat([productApiSlice.middleware])
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();



export const persister = persistStore(store)


export default store;
