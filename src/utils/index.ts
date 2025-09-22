import { createStandaloneToast } from "@chakra-ui/react"

const {toast} = createStandaloneToast()


interface IProduct {
  documentId: number
  title: string
  description: string
  price: number
  stock: number
  createdAt: string
  thumbnail: string
  category: string
  image: {
    url: string
  }
}

interface IShoppingCartItem extends IProduct {
  quantity: number
}


export const addItemToShoppingCart= (cartItem :  IProduct , shoppingCartItem: IShoppingCartItem[] )  => {
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