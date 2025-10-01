import { Button, Image, Stack, Text, Heading, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import type IProduct from "../types/IProduct";


const   ProductCard = (product: IProduct) => {
  return (
    <Link to={`/products/${product.documentId}`}>
      <Stack
        maxW="xs"
        mx="auto"
        bg="white"
        _dark={{
          bg: "gray.800",
        }}
        shadow="lg"
        rounded="lg"
        justifyContent={"space-between"}
      >
        <Stack px={4} py={2}>
          <Heading
            color="gray.800"
            _dark={{
              color: "white",
            }}
            fontWeight="bold"
            fontSize="3xl"
            textTransform="uppercase"
          >
            {product.title}
          </Heading>
          <Text
            mt={1}
            fontSize="sm"
            color="gray.600"
            _dark={{
              color: "gray.400",
            }}
            minH={"126"}
          >
            {product.description}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi quos
            quidem sequi illum facere recusandae voluptatibus
          </Text>
        </Stack>

        <Image
          h={48}
          w="full"
          fit="cover"
          mt={2}
          src={product.thumbnail.formats.thumbnail.url}
          alt={product.title}
        />
        <Flex justifyContent={"space-between"} px={6}>
          <Text fontSize="sm" fontWeight={"bold"} color="gray.400">
            {product.price}
          </Text>

          <Text fontSize="sm" fontWeight={"bold"} color="gray.400">
            {product.stock == 0 ? "Out of Stock" : `${product.stock} in Stock`}
          </Text>
        </Flex>

        <Flex
          alignItems="center"
          justifyContent="space-between"
          px={4}
          py={2}
          roundedBottom="lg"
          bg="#e6f3fd"
          _dark={{
            bg: "gray.900",
          }}
        >
          <Heading
            fontWeight="bold"
            fontSize="lg"
            color= "#9f7aea"
            _dark={{
              color: "#e6f3fd",
            }}
          >
            ${product.price}
          </Heading>
          <Button
            px={2}
            py={1}
            bg="#9f7aea"
            color="#e6f3fd"
            fontSize="xs"
            fontWeight="bold"
            rounded="lg"
            textTransform="uppercase"
            _hover={{ bg: "#e6f3fd", color: "#563891ff" }}
            _focus={{
              bg: "#e6f3fd",
              color: "#563891ff",
            }}
            _active={{
              bg: "gray.400",
              transform: "scale(0.95)",
            }}
          >
            Add to cart
          </Button>
        </Flex>
      </Stack>
    </Link>
  );
};

export default ProductCard;
