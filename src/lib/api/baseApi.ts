import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'https://kassahun-backend.onrender.com/api/v1',
  }),
  tagTypes: ['Products', 'Materials', 'Projects', 'About', 'Services', 'Blog', 'Testimonials', 'BeforeAfter', 'ContactInfo', 'FAQ'],
  endpoints: (builder) => ({
    getAboutPage: builder.query<any, void>({
      query: () => '/website/about',
      transformResponse: (response: any) => response.data,
      providesTags: ['About'],
    }),
    getServices: builder.query<any[], void>({
      query: () => '/website/services',
      transformResponse: (response: any) => response.data,
      providesTags: ['Services'],
    }),
    getBlogPosts: builder.query<any[], void>({
      query: () => '/website/blog',
      transformResponse: (response: any) => response.data,
      providesTags: ['Blog'],
    }),
    getTestimonials: builder.query<any[], void>({
      query: () => '/website/testimonials',
      transformResponse: (response: any) => response.data?.data ?? response.data ?? [],
      providesTags: ['Testimonials'],
    }),
    getBeforeAfter: builder.query<any[], void>({
      query: () => '/website/before-after',
      transformResponse: (response: any) => response.data,
      providesTags: ['BeforeAfter'],
    }),
    getContactInfo: builder.query<any, void>({
      query: () => '/website/contact-info',
      transformResponse: (response: any) => response.data,
      providesTags: ['ContactInfo'],
    }),
    getFaqs: builder.query<any[], void>({
      query: () => '/website/faqs',
      transformResponse: (response: any) => response.data,
      providesTags: ['FAQ'],
    }),
  }),
});

export const {
  useGetAboutPageQuery,
  useGetServicesQuery,
  useGetBlogPostsQuery,
  useGetTestimonialsQuery,
  useGetBeforeAfterQuery,
  useGetContactInfoQuery,
  useGetFaqsQuery,
} = baseApi;
