import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../api/axios.config";
import type { RootState } from "../store";
import type IProduct from "../../types/IProduct";



interface ProductSlice {
    loading : boolean
    productList : IProduct[]
    product? : IProduct
    error :  null
}

const initialState : ProductSlice = {
    loading : true ,
    productList : [],
    product : undefined,
    error : null
}



export const getProductsList = createAsyncThunk('products/getProductsList', async ( _ , {rejectWithValue}) => {
    try{
        const {data } =await axiosInstance.get('/api/products?populate=*')
    return data
    }catch(err){
        return rejectWithValue(err)   
    }
})

export const getSpecificProduct = createAsyncThunk('products/getSpecificProduct', async (id , {rejectWithValue}) => {
    try{
        const {data } =await axiosInstance.get(`/api/products/${id}?populate=*`)
    return data
    }catch(err){
        return rejectWithValue(err)   
    }
})



const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {

    },
   extraReducers: (builder) => {
  builder
    .addCase(getProductsList.pending, (state) => {
      state.loading = true;
      state.productList = [];
      state.error = null;
    })
    .addCase(getProductsList.fulfilled, (state, action) => {
      state.loading = false;
      state.productList = action.payload.data;
    })
    .addCase(getProductsList.rejected, (state, action) => {
      state.loading = false;
      state.productList = [];
      state.error = action.payload as null;
    });


     builder
      .addCase(getSpecificProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSpecificProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload.data;
        
      })
      .addCase(getSpecificProduct.rejected, (state, action) => {
        state.loading = false;
        state.product = undefined;
        state.error = action.payload as null;
      });

    

}
})


export const productsSelector =   ({product}: RootState) => product
export default productSlice.reducer;
