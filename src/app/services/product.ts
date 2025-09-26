import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApiSlice = createApi({
  reducerPath: "api",
  tagTypes: ["products"],
  refetchOnReconnect : true,
  refetchOnMountOrArgChange : true ,
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_SERVER_URL }),
  endpoints: (build) => ({
    getDashboardProducts: build.query({
      query: ({ page = 1 }: { page?: number }) =>
        `/api/products?populate=*&pagination[page]=${page}&pagination[pageSize]=10`,
    }),
    deleteDashboardProducts : build.mutation({
      query(id){
        return {
          url : `/api/products/${id}`
          ,method : "DELETE"
        }
      }
    })
  }),
});

export const { useGetDashboardProductsQuery , useDeleteDashboardProductsMutation} = productApiSlice;
