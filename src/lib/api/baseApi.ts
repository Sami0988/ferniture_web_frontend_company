import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'https://kassahun-backend.onrender.com/api/v1',
  }),
  tagTypes: ['Products', 'Materials', 'Projects', 'About', 'Services', 'Blog', 'Testimonials', 'BeforeAfter', 'ContactInfo', 'FAQ'],
  endpoints: (builder) => ({
    submitContact: builder.mutation<any, { name: string; email?: string; phone?: string; subject?: string; message: string }>({
      query: (body) => ({
        url: '/website/contact',
        method: 'POST',
        body,
      }),
    }),
    submitQuote: builder.mutation<any, { name: string; email?: string; phone: string; division?: string; description: string; budgetRange?: string }>({
      query: (body) => ({
        url: '/website/quotes',
        method: 'POST',
        body,
      }),
    }),
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
    getServiceBySlug: builder.query<any, { slug: string; locale?: string }>({
      query: ({ slug, locale }) => `/website/services/${slug}${locale ? `?locale=${locale}` : ''}`,
      transformResponse: (response: any) => response.data,
      providesTags: (_result, _error, { slug }) => [{ type: 'Services', id: slug }],
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
    getBlogPostBySlug: builder.query<any, { slug: string; locale?: string }>({
      query: ({ slug, locale }) => `/website/blog/${slug}${locale ? `?locale=${locale}` : ''}`,
      transformResponse: (response: any) => response.data,
      providesTags: (_result, _error, { slug }) => [{ type: 'Blog', id: slug }],
    }),
  }),
});

export const {
  useGetAboutPageQuery,
  useGetServicesQuery,
  useGetServiceBySlugQuery,
  useGetBlogPostsQuery,
  useGetBlogPostBySlugQuery,
  useGetTestimonialsQuery,
  useGetFeaturedTestimonialsQuery,
  useGetBeforeAfterQuery,
  useGetContactInfoQuery,
  useGetFaqsQuery,
  useSubmitContactMutation,
  useSubmitQuoteMutation,
} = baseApi;
