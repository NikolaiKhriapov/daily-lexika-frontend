import { API } from '@admin/store/api/API';
import { ApiEndpointsDailyLexikaWordData } from '@admin/utils/apiMethods';
import { Platform, WordDataCreateDto, WordDataDto, WordDataPatchDto } from '@library/daily-lexika';
import { PageResponse } from '@library/shared/utils';

export const dailyLexikaWordDataAPI = API.injectEndpoints({
  endpoints: (builder) => ({
    getPageOfWordData: builder.query<PageResponse<WordDataDto>, {
      platform: Platform;
      page: number;
      size: number;
      query?: string;
    }>({
      query: ({ platform, page, size, query }) => {
        let url = ApiEndpointsDailyLexikaWordData.getAllWordData()
          .replace('{0}', platform)
          .replace('{1}', page.toString())
          .replace('{2}', size.toString());
        if (query && query.trim().length > 0) {
          url = url.concat(`&query=${encodeURIComponent(query.trim())}`);
        }
        return url;
      },
      providesTags: ['DailyLexikaWordData'],
    }),
    getWordDataById: builder.query<WordDataDto, number>({
      query: (id) => ApiEndpointsDailyLexikaWordData.getWordDataById(id),
      providesTags: ['DailyLexikaWordData'],
    }),
    createWordData: builder.mutation<WordDataDto, WordDataCreateDto>({
      query: (payload) => ({
        url: ApiEndpointsDailyLexikaWordData.createWordData(),
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['DailyLexikaWordData'],
    }),
    updateWordData: builder.mutation<WordDataDto, { id: number; payload: WordDataPatchDto }>({
      query: ({ id, payload }) => ({
        url: ApiEndpointsDailyLexikaWordData.updateWordData(id),
        method: 'PATCH',
        body: payload,
      }),
      invalidatesTags: ['DailyLexikaWordData'],
    }),
    deleteWordData: builder.mutation<void, number>({
      query: (id) => ({
        url: ApiEndpointsDailyLexikaWordData.deleteWordData(id),
        method: 'DELETE',
      }),
      invalidatesTags: ['DailyLexikaWordData'],
    }),
  }),
});

export const {
  useGetPageOfWordDataQuery,
  useGetWordDataByIdQuery,
  useCreateWordDataMutation,
  useUpdateWordDataMutation,
  useDeleteWordDataMutation,
} = dailyLexikaWordDataAPI;
