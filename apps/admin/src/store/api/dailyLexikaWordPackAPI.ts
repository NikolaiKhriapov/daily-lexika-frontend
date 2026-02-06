import { API } from '@admin/store/api/API';
import { ApiEndpointsDailyLexikaWordPacks } from '@admin/utils/apiMethods';
import { Platform, WordPackCreateDto, WordPackDto, WordPackPatchDto } from '@library/daily-lexika';
import { PageResponse } from '@library/shared/utils';

export const dailyLexikaWordPackAPI = API.injectEndpoints({
  endpoints: (builder) => ({
    getPageOfWordPacks: builder.query<PageResponse<WordPackDto>, { platform: Platform; page: number; size: number }>({
      query: ({ platform, page, size }) => ApiEndpointsDailyLexikaWordPacks.getAllWordPacks()
        .replace('{0}', platform)
        .replace('{1}', page.toString())
        .replace('{2}', size.toString()),
      providesTags: ['DailyLexikaWordPacks'],
    }),
    getWordPackById: builder.query<WordPackDto, number>({
      query: (wordPackId) => ApiEndpointsDailyLexikaWordPacks.getWordPackById(wordPackId),
      providesTags: ['DailyLexikaWordPacks'],
    }),
    createWordPack: builder.mutation<WordPackDto, WordPackCreateDto>({
      query: (payload) => ({
        url: ApiEndpointsDailyLexikaWordPacks.createWordPack(),
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['DailyLexikaWordPacks'],
    }),
    updateWordPack: builder.mutation<WordPackDto, { id: number; payload: WordPackPatchDto }>({
      query: ({ id, payload }) => ({
        url: ApiEndpointsDailyLexikaWordPacks.updateWordPack(id),
        method: 'PATCH',
        body: payload,
      }),
      invalidatesTags: ['DailyLexikaWordPacks'],
    }),
    deleteWordPack: builder.mutation<void, number>({
      query: (id) => ({
        url: ApiEndpointsDailyLexikaWordPacks.deleteWordPack(id),
        method: 'DELETE',
      }),
      invalidatesTags: ['DailyLexikaWordPacks'],
    }),
  }),
});

export const {
  useGetPageOfWordPacksQuery,
  useGetWordPackByIdQuery,
  useCreateWordPackMutation,
  useUpdateWordPackMutation,
  useDeleteWordPackMutation,
} = dailyLexikaWordPackAPI;
