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
    addCustomWordPackToWordData: builder.mutation<WordDataDto, { wordPackId: number, wordDataId: number }>({
      query: ({ wordPackId, wordDataId }) => ({
        url: ApiEndpointsWordData.addCustomWordPackToWordData(wordDataId, wordPackId),
        method: QueryMethod.GET,
      }),
      invalidatesTags: ['PageOfWordsByWordPackId'],
      onQueryStarted(args, { queryFulfilled, dispatch }) {
        const patchResult = dispatch(wordPacksAPI.util?.updateQueryData('getAllWordPacks', undefined, (draft) => {
          const wordPack = draft?.find((item) => item.id === args.wordPackId);
          if (wordPack) {
            wordPack.wordsTotal = (wordPack.wordsTotal ?? 0) + 1;
          }
        }));
        queryFulfilled.catch(() => patchResult.undo());
      },
    }),
    addCustomWordPackToWordDataByWordPackId: builder.mutation<WordDataDto, { wordPackIdTo: number, wordPackIdFrom: number }>({
      query: ({ wordPackIdTo, wordPackIdFrom }) => ({
        url: ApiEndpointsWordData.addCustomWordPackToWordDataByWordPackId(wordPackIdTo, wordPackIdFrom),
        method: QueryMethod.GET,
      }),
      invalidatesTags: ['WordPacks', 'PageOfWordsByWordPackId'],
    }),
    removeCustomWordPackFromWordData: builder.mutation<WordDataDto, { wordPackId: number, wordDataId: number }>({
      query: ({ wordPackId, wordDataId }) => ({
        url: ApiEndpointsWordData.removeCustomWordPackFromWordData(wordDataId, wordPackId),
        method: QueryMethod.GET,
      }),
      invalidatesTags: ['PageOfWordsByWordPackId'],
      onQueryStarted(args, { queryFulfilled, dispatch }) {
        const patchResult = dispatch(wordPacksAPI.util?.updateQueryData('getAllWordPacks', undefined, (draft) => {
          const wordPack = draft?.find((item) => item?.id === args.wordPackId);
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
  useAddCustomWordPackToWordDataByWordPackIdMutation,
  useRemoveCustomWordPackFromWordDataMutation,
} = wordDataAPI;
