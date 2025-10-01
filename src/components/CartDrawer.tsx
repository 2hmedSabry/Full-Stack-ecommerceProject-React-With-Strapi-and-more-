import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Text,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { cartSelector, clearCart } from "../app/features/cartSlice";
import {   osCloseCartDrawerAction, selectGlobal } from "../app/features/globalSlice";
import { useAppDispatch } from "../app/store";
import CartDrawerItem from "./CartDrawerItem";
// import { useRef } from "react";

const CartDrawer = () => {
// const btnRef = useRef<HTMLButtonElement>(null);
  const cartData = useSelector(cartSelector);
  console.log(cartData);
  
  const globalData = useSelector(selectGlobal);
const dispatch = useAppDispatch()

const onClose = () => dispatch(osCloseCartDrawerAction())

  return (
    <div>
      <Drawer
        isOpen={globalData.isOpenCartDrawer}
        placement="right"
        onClose={onClose}
        // finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton onClick={onClose} />
          <DrawerHeader>
            Your Shopping Cart. {cartData.cartProducts.length}
          </DrawerHeader>
          <DrawerBody>
              {cartData.cartProducts ? cartData.cartProducts.map((item) => (
                <CartDrawerItem key={item.documentId} {...item} />
              )) : 
              <Text fontSize={'lg'}>Your Cart is empty</Text>
              }
          </DrawerBody>
          <DrawerFooter>
            <Button variant={"outline"} colorScheme="red" mr={3} onClick={()=> dispatch(clearCart())}>
              Clear All
            </Button>
            <Button colorScheme="blue">Check In</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default CartDrawer;
