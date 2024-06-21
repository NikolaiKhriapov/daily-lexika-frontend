import { API } from '@daily-lexika/store/api/API';
import { ApiEndpointsWords } from '@daily-lexika/utils/apiMethods';
import { Status, WordDto } from '@library/daily-lexika';
import { PageResponse, QueryMethod } from '@library/shared/utils';

export const wordsAPI = API.injectEndpoints({
  endpoints: (builder) => ({
    getPageOfWordsByStatus: builder.query<PageResponse<WordDto>, { status: Status, page: number, size: number }>({
      query: ({ status, page, size }) => ({
        url: ApiEndpointsWords.getPageOfWordsByStatus(status, page, size),
        method: QueryMethod.GET,
      }),
      providesTags: ['PageOfWordsByStatus'],
    }),
    getWordOfTheDay: builder.query<WordDto, void>({
      query: () => ({
        url: ApiEndpointsWords.getWordOfTheDay(),
        method: QueryMethod.GET,
      }),
    }),
    getWordByWordDataId: builder.query<WordDto, number>({
      query: (wordDataId) => ({
        url: ApiEndpointsWords.getWordByWordDataId(wordDataId),
        method: QueryMethod.GET,
      }),
    }),
  }),
});

export const {
  useGetPageOfWordsByStatusQuery,
  useGetWordOfTheDayQuery,
  useGetWordByWordDataIdQuery,
} = wordsAPI;
