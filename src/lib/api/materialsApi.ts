import { baseApi } from './baseApi';

export interface Material {
  id: string;
  name: string;
  type: string;
  image: string | null;
}

interface MaterialsApiResponse {
  success: boolean;
  data: {
    materials: Material[];
  };
}

export const materialsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMaterials: builder.query<Material[], void>({
      query: () => '/materials/store',
      transformResponse: (response: MaterialsApiResponse) => response.data.materials,
      providesTags: ['Materials'],
    }),
  }),
});

export const { useGetMaterialsQuery } = materialsApi;
