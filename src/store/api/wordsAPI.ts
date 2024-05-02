import { API, providesList } from '@store/api/API';
import { ApiEndpointsWords } from '@utils/app/apiMethods';
import { QueryMethods } from '@utils/constants';
import { Status, WordDto } from '@utils/types';

export const wordsAPI = API.injectEndpoints({
  endpoints: (builder) => ({
    getAllWordsByStatus: builder.query<WordDto[], { status: Status, page: number, size: number }>({
      query: ({ status, page, size }) => ({
        url: ApiEndpointsWords.getAllWordsByStatus(status, page, size),
        method: QueryMethods.GET,
      }),
      providesTags: (result) => providesList(result, 'Words'),
    }),
    getWordOfTheDay: builder.query<WordDto, void>({
      query: () => ({
        url: ApiEndpointsWords.getWordOfTheDay(),
        method: QueryMethods.GET,
      }),
    }),
  }),
});

export const {
  useGetAllWordsByStatusQuery,
  useGetWordOfTheDayQuery,
} = wordsAPI;
