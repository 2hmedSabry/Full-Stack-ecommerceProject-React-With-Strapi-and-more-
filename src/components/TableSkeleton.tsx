import { Stack, Flex, Skeleton } from "@chakra-ui/react";

const TableSkeleton = () => {
  return (
    <Stack maxW="full" mx="auto" my={10}>
      {Array.from({ length: 10 }, (_, idx) => (
        <Flex
          key={idx}
          alignItems={"center"}
          justifyContent={"space-between"}
          border={"1px solid #333"}
          h={"50px"}
          rounded={"md"}
          p={2}
        >
          <Skeleton h="9px" w={"120px"} bg={"grey"} />
          <Skeleton h="9px" w={"120px"} bg={"grey"} />
          <Skeleton h="9px" w={"120px"} bg={"grey"} />
          <Skeleton h="9px" w={"120px"} bg={"grey"} />
          <Skeleton h="9px" w={"120px"} bg={"grey"} />
          <Skeleton h="9px" w={"120px"} bg={"grey"} />

          <Flex>
            <Skeleton h="30px" w={"50px"} startColor="red.300" endColor="red.500" mr={4}/>
            <Skeleton h="30px" w={"50px"} startColor="blue.300" endColor="blue.500" />
          </Flex>
        </Flex>
      ))}
    </Stack>
  );
};
export default TableSkeleton;
