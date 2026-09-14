import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'https://kassahun-backend.onrender.com/api/v1',
  }),
  tagTypes: ['Products', 'Materials', 'Projects', 'About', 'Services', 'Blog', 'Testimonials', 'BeforeAfter', 'ContactInfo', 'FAQ'],
  endpoints: (builder) => ({
    getAboutPage: builder.query<any, string>({
      query: (locale) => `/website/about${locale ? `?locale=${locale}` : ''}`,
      transformResponse: (response: any) => response.data,
      providesTags: ['About'],
    }),
    getServices: builder.query<any[], string>({
      query: (locale) => `/website/services${locale ? `?locale=${locale}` : ''}`,
      transformResponse: (response: any) => response.data,
      providesTags: ['Services'],
    }),
    getBlogPosts: builder.query<any[], { category?: string; locale?: string }>({
      query: ({ category, locale }) => {
        const params = new URLSearchParams();
        if (category) params.set('category', category);
        if (locale) params.set('locale', locale);
        const qs = params.toString();
        return `/website/blog${qs ? `?${qs}` : ''}`;
      },
      transformResponse: (response: any) => response.data,
      providesTags: ['Blog'],
    }),
    getTestimonials: builder.query<any[], string>({
      query: (locale) => `/website/testimonials${locale ? `?locale=${locale}` : ''}`,
      transformResponse: (response: any) => response.data?.data ?? response.data ?? [],
      providesTags: ['Testimonials'],
    }),
    getFeaturedTestimonials: builder.query<any[], string>({
      query: (locale) => `/website/testimonials/featured${locale ? `?locale=${locale}` : ''}`,
      transformResponse: (response: any) => response.data,
      providesTags: ['Testimonials'],
    }),
    getBeforeAfter: builder.query<any[], string>({
      query: (locale) => `/website/before-after${locale ? `?locale=${locale}` : ''}`,
      transformResponse: (response: any) => response.data,
      providesTags: ['BeforeAfter'],
    }),
    getContactInfo: builder.query<any, string>({
      query: (locale) => `/website/contact-info${locale ? `?locale=${locale}` : ''}`,
      transformResponse: (response: any) => response.data,
      providesTags: ['ContactInfo'],
    }),
    getFaqs: builder.query<any[], string>({
      query: (locale) => `/website/faqs${locale ? `?locale=${locale}` : ''}`,
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
  useGetFeaturedTestimonialsQuery,
  useGetBeforeAfterQuery,
  useGetContactInfoQuery,
  useGetFaqsQuery,
} = baseApi;
