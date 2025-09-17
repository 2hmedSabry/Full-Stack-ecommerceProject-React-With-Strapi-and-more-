import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Image,
  Stack,
  Text,
  Heading,
  Flex,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

interface Product {
  id: number;
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
}

const ProductCard = (product: Product) => {
  return (
    <Link to={`/products/${product.id}`}>
      <Card maxW="sm" overflow="hidden" border="1px solid #a8b5c8" bg="none">
      {/* Product Image */}
      <Image
        src={`${import.meta.env.VITE_SERVER_URL}${product?.image?.url}`}
        alt={product.title}
        mx="auto"
        objectFit="cover"
        h="200px"
        w="full"
      />

      {/* Product Content */}
      <CardBody>
        <Stack spacing="3">
          <Flex justifyContent="space-between" alignItems={"center"}>
            <Heading size="md">{product.title.toUpperCase()}</Heading>
            <Text color="purple.600" fontSize="2xl" fontWeight="bold">
              ${product.price}
            </Text>
          </Flex>
          <Text fontSize="md">{product.description}</Text>
          <Flex justifyContent="space-between" alignItems={"center"}>

          <Text fontSize="sm" fontWeight={"bold"} color="gray.400" >
            {product.stock == 0 ? "Out of Stock" : `${product.stock} in stock`}
          </Text>
          <Text fontSize="sm" color="gray.600">
             SAMSUNG
          </Text>
          </Flex>
        </Stack>
      </CardBody>

      {/* Footer with Button */}
      <CardFooter p={0} px={5} pb={5} gap={4}>
        <Button
          bg="#9f7aea"
          color="#e6f3fd"
          size="lg"
          variant="outline"
          border="none"
          py={5}
          w="full"
          _hover={{ bg: "#e6f3fd", color: "#563891ff" }}
        >
          View Details
        </Button>
        <Button
          bg="#9f7aea"
          color="#e6f3fd"
          size="lg"
          variant="outline"
          border="none"
          py={5}
          w="full"
          _hover={{ bg: "#e6f3fd", color: "#9f7aea" }}
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
    </Link>
  );
};

export default ProductCard;
