import { Box, Skeleton, SkeletonText } from "@chakra-ui/react"

const ProductDetailsSkeleton = () => {
  return (
    <Box w={'lg'} bg={'gray.700'} p={5} rounded={''}>
      <Skeleton height={'200px'} />
        <SkeletonText mt="4" noOfLines={1} lineHeight="4"  w={'100px'}/>
        <SkeletonText mt="4" noOfLines={1} lineHeight="4" />
        <SkeletonText mt="4" noOfLines={1} lineHeight="4" />
        <Skeleton mt="4" height={'50px'} lineHeight="4" w={"full"}  rounded={'lg'}/>
    </Box>
    
  ) 
}

export default ProductDetailsSkeleton
