  import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
  import CookiesService from "../../services/CookiesService";
import type IProduct from "../../types/IProduct";

  console.log("productApiSlice mounted ✅");

  export const productApiSlice = createApi({
    reducerPath: "api",
    tagTypes: ["products"],
    refetchOnReconnect: true,
    refetchOnMountOrArgChange: true,
    baseQuery: fetchBaseQuery(
      { 
        baseUrl: import.meta.env.VITE_SERVER_URL,
        prepareHeaders: (headers: Headers) => {
          const token = CookiesService.getCookie("jwt");
          console.log("JWT Token >>>", token);
          if (token) {
            headers.set("Authorization", `Bearer ${token}`);
            console.log("Header after set >>>", headers.get("Authorization"));
          }
          return headers;
        },

      }),
    
    endpoints: (build) => ({
    // GET Products
      getDashboardProducts: build.query<{ data: IProduct[] }, { page?: number }>({
        query: ({ page = 1 }: { page?: number }) => `/api/products?populate=*&pagination[page]=${page}&pagination[pageSize]=10`,
        providesTags: (result) =>( result ? [
          ...result.data.map(({ documentId }) => ({ type: 'products' as const, id : documentId })),
          { type: 'products', id: 'LIST' }]: [{ type: 'products', id: 'LIST' }])
      },
        
    )
    //Update Product
    ,updateDashboardProducts : build.mutation({
      query :({id , body})=>{
        console.log('id',id);
        
        return{
          url : `/api/products/${id}`,
          method : "PUT",
          body: { data: body } ,
          headers: {
            "Content-Type": "application/json",
          },

        }
      },async onQueryStarted({id,...patch},{dispatch, queryFulfilled}){
        const patchResult = dispatch(
          productApiSlice.util.updateQueryData("getDashboardProducts" , id , draft =>{
            Object.assign(draft,patch)
          } )
        )
        try{
          await queryFulfilled
        }catch{
          patchResult.undo()
        }
      },
      invalidatesTags  : [{type : "products" , id : "LIST"}]
    })
    // Delete Product
      ,deleteDashboardProducts: build.mutation({
        query(id) {
          return {
            url: `/api/products/${id}`,
            method: "DELETE",
        }},
        invalidatesTags: [{type : "products" , id : "LIST"}]

      }),
    }),
  });

  export const {
    useGetDashboardProductsQuery,
    useDeleteDashboardProductsMutation,
    useUpdateDashboardProductsMutation,
  } = productApiSlice;
