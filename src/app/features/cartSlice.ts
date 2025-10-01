import { createSlice } from "@reduxjs/toolkit";
import { addItemToShoppingCart } from "../../utils";
import { createStandaloneToast } from "@chakra-ui/react"
import type ICartProduct from "../../types/ICartProduct";
import type IProduct from "../../types/IProduct";


const initialState : {cartProducts : ICartProduct[]} = {
    cartProducts : []
};
const {toast} = createStandaloneToast()




export function mapProductToCart(product: IProduct): ICartProduct {
  return {
    documentId: product.documentId,
    title: product.title,
    description: product.description,
    price: product.price,
    stock: product.stock,
    createdAt: product.createdAt ?? "",
    category: product.category[0]?.title || "",   // خد أول تصنيف بس
    thumbnail: product.thumbnail.formats.thumbnail.url, // نزّل الـ url
    image: product.image?.formats.thumbnail.url || "", 
    quantity: 1,        // 👈 أول ما يضاف للكارت، يبدأ بواحد
  };
}


const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart : (state , action : { payload: IProduct }) => {
            const cartItem = mapProductToCart(action.payload)
            state.cartProducts  = addItemToShoppingCart(cartItem , state.cartProducts)
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