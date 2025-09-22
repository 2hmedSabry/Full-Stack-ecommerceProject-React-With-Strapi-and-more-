import { Button, Flex, Image, Text } from "@chakra-ui/react";
import { removeFromCart } from "../app/features/cartSlice";
import { useAppDispatch } from "../app/store";
const CartDrawerItem = ({
documentId,
  title,
  price,
  quantity,
  image,
}: {
    documentId: number;
  title: string;
  price: number;
  quantity: number;
  image: { url: string };
}) => {



    const dispatch = useAppDispatch()
  return (
    <Flex alignItems={"center"} justifyContent={"space-between"}>
      <Flex pb={4}>
        <Image
          borderRadius="full"
          mx={2}
          src={`${import.meta.env.VITE_SERVER_URL}` + image?.url}
          alt={title}
          width={100}
          height={100}
        />
        <Flex
          gap={1}
          flexDirection={"column"}
          fontWeight={"bold"}
          alignSelf={"center"}
        >
          <Text>{title}</Text>
          <Text color="gray">${price}</Text>
          <Text color="gray">Quantity: {quantity}</Text>
        </Flex>
      </Flex>
      <Button size={"sm"} colorScheme="red" onClick={()=>dispatch(removeFromCart(documentId))} >
        X
      </Button>
    </Flex>
  );
};

export default CartDrawerItem;
