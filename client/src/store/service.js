import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://dummyjson.com",
  }),
  endpoints: (builder) => ({
    // Fetch all products
    getProducts: builder.query({
      query: () => "/products?limit=100",
      transformResponse: (res) => res.products,
    }),

    // Fetch all categories
    getCategories: builder.query({
      query: () => "/products/categories",
    }),

    // Fetch products by category
    getProductsByCategory: builder.query({
      query: (category) => `/products/category/${category}`,
      transformResponse: (res) => res.products,
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetCategoriesQuery,
  useGetProductsByCategoryQuery,
} = productApi;

