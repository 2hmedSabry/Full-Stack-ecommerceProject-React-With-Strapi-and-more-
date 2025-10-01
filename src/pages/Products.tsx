import { Grid } from "@chakra-ui/react";
import ProductCard from "../components/ProductCard";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useQuery } from "@tanstack/react-query";
import ProductSkeleton from "../components/ProductCardSkeleton";
import { useEffect } from "react";
import {
  getProductsList,
  productsSelector,
} from "../app/features/productSlice";
import { useAppDispatch } from "../app/store";
import { useSelector } from "react-redux";
import type IProduct from "../types/IProduct";



const Products = () => {
  const dispatch = useAppDispatch();
  const { productList, loading, error } = useSelector(productsSelector);

  console.log(error);

  // const getProductsList = async () => {
  //   const { data } = await axios.get(
  //     `${import.meta.env.VITE_SERVER_URL}/api/products?populate=*`
  //   );

  //   return data;
  // };

  // const { isLoading, data } = useQuery({
  //   queryKey: ["products"],
  //   queryFn: getProductsList,
  // });

  useEffect(() => {
    dispatch(getProductsList());
  }, [dispatch]);

  if (loading) {
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
      {productList.map((product: IProduct) => {
        return <ProductCard key={product.documentId} {...product} />;
      })}
    </Grid>
  );
};

export default Products;
