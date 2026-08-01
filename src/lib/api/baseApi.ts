import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'https://kassahun-backend.onrender.com/api/v1',
    prepareHeaders: (headers) => {
      return headers;
    },
  }),
  tagTypes: ['Products', 'Materials', 'Projects'],
  endpoints: () => ({}),
});
