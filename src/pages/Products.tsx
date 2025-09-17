import { Grid } from "@chakra-ui/react";
import ProductCard from "../components/ProductCard";
import axios from "axios";
// import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ProductSkeleton from "../components/ProductCardSkeleton";
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

const Products = () => {

  const getProductsList = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/api/products?populate=*`
    );

    return data;
  };

  const { isLoading, data } = useQuery({
    queryKey: ["products"],
    queryFn: getProductsList,
  });

  if (isLoading) {
    return (
      <Grid
        margin={30}
        templateColumns="repeat(auto-fill, minmax(300px , 1fr))"
        gap={6}
      >
        {Array.from({ length: 20 }).map((_, index) => (
          <ProductSkeleton key={index} />
        ))}
      </Grid>
    );
  }

  return (
    <Grid

      margin={30}
      templateColumns="repeat(auto-fill, minmax(300px , 1fr))"
      gap={6}
    >
      {data.data.map((product: Product) => {
        console.log(product);
        return <ProductCard key={product.id} {...product} />;
      })}
    </Grid>
  );
};

export default Products;
