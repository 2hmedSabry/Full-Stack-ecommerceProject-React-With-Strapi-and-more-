import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    isOpenCartDrawer : false,
    onOpenCartDrawer : false,
    osCloseCartDrawer : false

}


const globalSlice = createSlice({
    name: "global",
    initialState,
    reducers: {
        isOpenCartDrawer: (state) => {
            state.isOpenCartDrawer = !state.isOpenCartDrawer
        }
        ,onOpenCartDrawerAction: (state) => {
            state.onOpenCartDrawer = true
            state.isOpenCartDrawer = true
        }
        ,osCloseCartDrawerAction: (state) => {
            state.osCloseCartDrawer = false
            state.isOpenCartDrawer = false
        }

    },

  });
  
  export const { isOpenCartDrawer , onOpenCartDrawerAction , osCloseCartDrawerAction} = globalSlice.actions;
  export const selectGlobal = (state: { global: typeof initialState }) => state.global;
  export default globalSlice.reducer;
  