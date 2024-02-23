import { API } from '@store/api/API';
import { ApiEndpointsWords } from '@utils/apiMethods';
import { QueryMethods } from '@utils/constants';
import { Status, WordDTO } from '@utils/types';

export const wordsAPI = API.injectEndpoints({
  endpoints: (builder) => ({
    getAllWordsByStatus: builder.query<WordDTO[], { status: Status, page: number, size: number }>({
      query: ({ status, page, size }) => ({
        url: ApiEndpointsWords.getAllWordsByStatus(status, page, size),
        method: QueryMethods.GET,
      }),
      providesTags: ['Words'],
    }),
  }),
});

export const {
  useGetAllWordsByStatusQuery,
} = wordsAPI;
