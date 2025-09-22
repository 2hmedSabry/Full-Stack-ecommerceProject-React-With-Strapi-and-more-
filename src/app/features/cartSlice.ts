import { createSlice } from "@reduxjs/toolkit";
import { addItemToShoppingCart } from "../../utils";
import { createStandaloneToast } from "@chakra-ui/react"
interface IProduct {
        documentId: number;
        title: string;
        description: string;
        price: number;
        stock: number;
        createdAt: string;
        thumbnail: string;
        category: string;
        image: {
            url: string;
        };
        quantity : number
     }


const initialState : {cartProducts : IProduct[]} = {
    cartProducts : []
};
const {toast} = createStandaloneToast()


const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart : (state , action) => {
            state.cartProducts  = addItemToShoppingCart(action.payload , state.cartProducts)
        },
        removeFromCart: (state , action) => {
            state.cartProducts = state.cartProducts.filter(item => item.documentId !== action.payload)
            toast(
                {
                    title: 'Removed from your cart',
                    status: 'success',
                    duration: 2000,
                    isClosable: true
                }
            )
        },
        clearCart : (state) => {
            state.cartProducts = []
            toast(
                {
                    title: 'Your cart is empty now',
                    status: 'success',
                    duration: 2000,
                    isClosable: true
                }
            )
        }
    },
})


export const {addToCart , removeFromCart, clearCart} = cartSlice.actions;
export const cartSelector = (state : {cart : typeof initialState}) => state.cart
export default cartSlice.reducer