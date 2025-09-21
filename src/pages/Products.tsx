import { Grid } from "@chakra-ui/react";
import ProductCard from "../components/ProductCard";
import ProductSkeleton from "../components/ProductCardSkeleton";
import { useEffect } from "react";
import {
  getProductsList,
  productsSelector,
} from "../app/features/productSlice";
import { useAppDispatch } from "../app/store";
import { useSelector } from "react-redux";

interface Product {
  documentId: number;
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
  const dispatch = useAppDispatch();
  const { productList, loading, error } = useSelector(productsSelector);

  console.log(productList);
console.log(error);


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

  console.log(productList);

  return (
    <Grid
      margin={30}
      templateColumns="repeat(auto-fill, minmax(300px , 1fr))"
      gap={6}
    >
      {productList.map((product: Product) => {
        console.log(product);
        return <ProductCard key={product.documentId} {...product} />;
      })}
    </Grid>
  );
};

export default Products;
