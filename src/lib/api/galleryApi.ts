import { baseApi } from './baseApi';

export interface Project {
  id: string;
  title: string;
  imageUrl: string;
  division: string;
  aspect: string;
  roomType?: string;
  isFeatured?: boolean;
  createdAt?: string;
  projectTitle?: string;
  projectId?: string | null;
}

interface PaginatedProjects {
  data: Project[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

interface GalleryApiResponse {
  success: boolean;
  data: PaginatedProjects;
}

interface GetProjectsParams {
  page?: number;
  limit?: number;
  division?: string;
}

export const galleryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query<PaginatedProjects, GetProjectsParams | void>({
      query: (params) => {
        if (!params) return '/gallery-project';
        const searchParams = new URLSearchParams();
        if (params.page) searchParams.set('page', String(params.page));
        if (params.limit) searchParams.set('limit', String(params.limit));
        if (params.division) searchParams.set('division', params.division);
        const query = searchParams.toString();
        return `/gallery-project${query ? `?${query}` : ''}`;
      },
      transformResponse: (response: GalleryApiResponse) => response.data,
      providesTags: ['Projects'],
    }),
  }),
});

export const { useGetProjectsQuery } = galleryApi;
