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
      providesTags: ['About'],
    }),
    getServices: builder.query<any[], void>({
      query: () => '/website/services',
      providesTags: ['Services'],
    }),
    getBlogPosts: builder.query<any[], void>({
      query: () => '/website/blog',
      providesTags: ['Blog'],
    }),
    getTestimonials: builder.query<any[], void>({
      query: () => '/website/testimonials',
      providesTags: ['Testimonials'],
    }),
    getBeforeAfter: builder.query<any[], void>({
      query: () => '/website/before-after',
      providesTags: ['BeforeAfter'],
    }),
    getContactInfo: builder.query<any, void>({
      query: () => '/website/contact-info',
      providesTags: ['ContactInfo'],
    }),
    getFaqs: builder.query<any[], void>({
      query: () => '/website/faqs',
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
