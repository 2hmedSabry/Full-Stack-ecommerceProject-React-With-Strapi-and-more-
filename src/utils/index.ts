import { createStandaloneToast } from "@chakra-ui/react"
import type ICartProduct from "../types/ICartProduct"

const {toast} = createStandaloneToast()




export const addItemToShoppingCart= (cartItem :  ICartProduct , shoppingCartItem: ICartProduct[] )  => {
    const existsItem = shoppingCartItem.find(item => item.documentId === cartItem.documentId)
    if(existsItem){
        toast({
            title: 'Added to your cart',
            status: 'success',
            duration: 2000,
            isClosable: true

        })
        return  shoppingCartItem.map(item => item.documentId === cartItem.documentId ? {...item , quantity : item.quantity + 1} : item)
    }
    return [...shoppingCartItem, {...cartItem , quantity : 1}]
    
}