import axios from "axios";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import ProductDetailsSkeleton from "../components/ProductDetailsSkeleton.tsx";
import {
  Button,
  Flex,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import { BsArrowLeft } from "react-icons/bs";
import { useAppDispatch } from "../app/store.ts";
import { addToCart } from "../app/features/cartSlice.ts";

const ProductPage = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  const getProductsList = async () => {
    const { data } = await axios.get(
      `${
        import.meta.env.VITE_SERVER_URL
      }/api/products/${id}?populate=*&filds=price,description,images,title`
    );
    return data;
  };

  const { isLoading, data } = useQuery({
    queryKey: ["products", id],
    queryFn: getProductsList,
  });

  const goBack = () => navigate(-1);
  const addToCartHandler = () => {
    dispatch(addToCart(data?.data));
    console.log(data?.data);
  };
  useEffect(() => {
    document.title = `Products ${data?.data?.attributes?.title} page`;
  }, [data]);

  if (isLoading) {
    return (
      <Flex
        maxW={"sm"}
        mx={"auto"}
        my={20}
        fontSize={"lg"}
        cursor={"pointer"}
        onClick={goBack}
      >
        <ProductDetailsSkeleton />
      </Flex>
    );
  }

  return (
    <>
    {/* Back button */}
      <Flex
        alignItems={"center"}
        maxW={"sm"}
        mx={"auto"}
        my={7}
        fontSize={"lg"}
        cursor={"pointer"}
        onClick={goBack}
      >
        <BsArrowLeft />
        <Text ml={2}>Back</Text>
      </Flex>
      <Flex w="full" alignItems="center" justifyContent="center">
        <Flex
          direction="column"
          justifyContent="center"
          alignItems="center"
          w="sm"
          mx="auto"
        >
          <Stack
            bg="gray.300"
            h={64}
            w="full"
            rounded="lg"
            shadow="md"
            bgSize="cover"
            bgPos="center"
            style={{
              backgroundImage: `url(${data?.data.thumbnail.formats.thumbnail.url})`,
            }}
          ></Stack>

          <Stack
            w={{
              base: 56,
              md: 64,
            }}
            bg="white"
            _dark={{
              bg: "gray.800",
            }}
            mt={-10}
            shadow="lg"
            rounded="lg"
            overflow="hidden"
          >
            <Heading
              py={2}
              textAlign="center"
              fontWeight="bold"
              textTransform="uppercase"
              color="gray.800"
              _dark={{
                color: "white",
              }}
              letterSpacing={1}
            >
              {data?.data?.title}
            </Heading>

            <Flex
              alignItems="center"
              justifyContent="space-between"
              py={2}
              px={3}
              bg="gray.200"
              _dark={{
                bg: "gray.700",
              }}
            >
              <Text
                fontWeight="bold"
                color="gray.800"
                _dark={{
                  color: "gray.200",
                }}
              >
                ${data?.data?.price}
              </Text>
              <Button
                bg="gray.800"
                fontSize="xs"
                fontWeight="bold"
                color="white"
                px={2}
                py={1}
                rounded="lg"
                textTransform="uppercase"
                _hover={{
                  bg: "gray.700",
                  _dark: {
                    bg: "gray.600",
                  },
                }}
                _focus={{
                  bg: "gray.700",
                  _dark: {
                    bg: "gray.600",
                  },
                  outline: "none",
                }}
                onClick={addToCartHandler}
              >
                Add to cart
              </Button>
            </Flex>
          </Stack>
        </Flex>
      </Flex>
      ;
    </>
  );
};

export default ProductPage;
