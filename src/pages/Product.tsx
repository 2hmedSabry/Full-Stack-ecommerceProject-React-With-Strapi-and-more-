import axios from "axios";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import ProductDetailsSkeleton from "../components/ProductDetailsSkeleton.tsx";
import {
  Button,
  // Card,
  // CardBody,
  // CardFooter,
  Flex,
  Heading,
  // Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { BsArrowLeft } from "react-icons/bs";

const ProductPage = () => {
  // const id = "nrugg2biv9w2xbvytmq3awmu";
  const { id } = useParams();
  const navigate = useNavigate();

  const getProductsList = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/api/products/${id}?populate=*`
    );
    return data;
  };

  const { isLoading, data } = useQuery({
    queryKey: ["products", id],
    queryFn: getProductsList,
  });

  const goBack = () => {
    navigate(-1);
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
      {/* Back Button */}
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

      {/* Product Card */}
      {/* <Card
        maxW="md"
        mx={"auto"}
        mb={20}
        border={"1px solid #a8b5c8"}
        bg={"none"}
      >
        <CardBody>
          <Image
            src={`${import.meta.env.VITE_SERVER_URL}${data?.data?.image?.url}`}
            objectFit={"cover"}
            alt={data?.data?.attributes?.title}
            borderRadius="lg"
            h={"200px"}
            w={"full"}
          />
          <Stack mt="6" lineHeight="3">
            <Heading size="md" textAlign={"center"}>
              {data?.data?.title}
            </Heading>
            <Text textAlign={"center"}>{data?.data?.description}</Text>
            <Text color={"purple.300"} fontSize={"xl"} textAlign={"center"}>
              {data?.data?.category[0].title}
            </Text>
            <Text color={"purple.300"} fontSize={"2xl"} textAlign={"center"}>
              ${data?.data?.price}
            </Text>
          </Stack>
        </CardBody>

        <CardFooter justifyContent="center">
          <Button
            variant={"solid"}
            colorScheme={"purple"}
            onClick={() => {}}
            bg={"#a8b5c8"}
            color={"#9f7aea"}
            _hover={{ bg: "#9f7aea", color: "#a8b5c8" }}
            textTransform={"uppercase"}
          >
            Buy Now
          </Button>
        </CardFooter>
      </Card> */}



      <Flex
  
  w="full"
  alignItems="center"
  justifyContent="center"
>
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
        backgroundImage:
          `url(${import.meta.env.VITE_SERVER_URL}${data?.data?.image?.url})`,
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
        >
          Add to cart
        </Button>
      </Flex>
    </Stack>
  </Flex>
</Flex>;
    </>
  );
};

export default ProductPage;
