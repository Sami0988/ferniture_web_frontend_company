import { baseApi } from './baseApi';

export interface Product {
  id: string;
  name: string;
  category: string;
  material: string;
  price: number;
  image: string;
  description?: string;
}

interface ProductsApiResponse {
  success: boolean;
  data: {
    products: Product[];
  };
}

export const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => '/website/products/store',
      transformResponse: (response: ProductsApiResponse) => response.data.products,
      providesTags: ['Products'],
    }),
  }),
});

export const { useGetProductsQuery } = productsApi;
