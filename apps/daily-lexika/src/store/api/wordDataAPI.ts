import { API } from '@daily-lexika/store/api/API';
import { wordPacksAPI } from '@daily-lexika/store/api/wordPacksAPI';
import { ApiEndpointsWordData } from '@daily-lexika/utils/apiMethods';
import { WordDataDto } from '@library/daily-lexika';
import { QueryMethod } from '@library/shared/utils';

export const wordDataAPI = API.injectEndpoints({
  endpoints: (builder) => ({
    searchWordData: builder.query<WordDataDto[], { query: string; limit: number }>({
      query: ({ query, limit }) => ({
        url: ApiEndpointsWordData.searchWordData(query, limit),
        method: QueryMethod.GET,
      }),
    }),
    addCustomWordPackToWordData: builder.mutation<WordDataDto, { wordPackName: string, wordDataId: number }>({
      query: ({ wordPackName, wordDataId }) => ({
        url: ApiEndpointsWordData.addCustomWordPackToWordData(wordDataId, wordPackName),
        method: QueryMethod.GET,
      }),
      invalidatesTags: ['PageOfWordsByWordPackName'],
      onQueryStarted(args, { queryFulfilled, dispatch }) {
        const patchResult = dispatch(wordPacksAPI.util?.updateQueryData('getAllWordPacks', undefined, (draft) => {
          const wordPack = draft?.find((item) => item.name === args.wordPackName);
          if (wordPack) {
            wordPack.wordsTotal = (wordPack.wordsTotal ?? 0) + 1;
          }
        }));
        queryFulfilled.catch(() => patchResult.undo());
      },
    }),
    addCustomWordPackToWordDataByWordPackName: builder.mutation<WordDataDto, { wordPackNameTo: string, wordPackNameFrom: string }>({
      query: ({ wordPackNameTo, wordPackNameFrom }) => ({
        url: ApiEndpointsWordData.addCustomWordPackToWordDataByWordPackName(wordPackNameTo, wordPackNameFrom),
        method: QueryMethod.GET,
      }),
      invalidatesTags: ['WordPacks', 'PageOfWordsByWordPackName'],
    }),
    removeCustomWordPackFromWordData: builder.mutation<WordDataDto, { wordPackName: string, wordDataId: number }>({
      query: ({ wordPackName, wordDataId }) => ({
        url: ApiEndpointsWordData.removeCustomWordPackFromWordData(wordDataId, wordPackName),
        method: QueryMethod.GET,
      }),
      invalidatesTags: ['PageOfWordsByWordPackName'],
      onQueryStarted(args, { queryFulfilled, dispatch }) {
        const patchResult = dispatch(wordPacksAPI.util?.updateQueryData('getAllWordPacks', undefined, (draft) => {
          const wordPack = draft?.find((item) => item?.name === args.wordPackName);
          if (wordPack && wordPack.wordsTotal) {
            wordPack.wordsTotal -= 1;
          }
        }));
        queryFulfilled.catch(() => patchResult.undo());
      },
    }),
  }),
});

export const {
  useSearchWordDataQuery,
  useAddCustomWordPackToWordDataMutation,
  useAddCustomWordPackToWordDataByWordPackNameMutation,
  useRemoveCustomWordPackFromWordDataMutation,
} = wordDataAPI;
