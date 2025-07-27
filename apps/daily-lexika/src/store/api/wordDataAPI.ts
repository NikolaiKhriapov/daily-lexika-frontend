import WordDataHelper from '@daily-lexika/helpers/WordDataHelper';
import { API } from '@daily-lexika/store/api/API';
import { wordPacksAPI } from '@daily-lexika/store/api/wordPacksAPI';
import { ApiEndpointsWordData } from '@daily-lexika/utils/apiMethods';
import { WordDataDto } from '@library/daily-lexika';
import { QueryMethod } from '@library/shared/utils';

export const wordDataAPI = API.injectEndpoints({
  endpoints: (builder) => ({
    getAllWordData: builder.query<WordDataDto[], void>({
      query: () => ({
        url: ApiEndpointsWordData.getAllWordData(),
        method: QueryMethod.GET,
      }),
      transformResponse: (response: WordDataDto[]) => response.sort(WordDataHelper.sortWordDataChineseByTranscription),
    }),
    addCustomWordPackToWordData: builder.mutation<WordDataDto, { wordPackName: string, wordDataId: number }>({
      query: ({ wordPackName, wordDataId }) => ({
        url: ApiEndpointsWordData.addCustomWordPackToWordData(wordDataId, wordPackName),
        method: QueryMethod.GET,
      }),
      invalidatesTags: ['PageOfWordsByWordPackName'],
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        const patchResult = dispatch(wordPacksAPI.util?.updateQueryData('getAllWordPacks', undefined, (draft) => {
          const wordPack = draft?.find((item) => item.name === args.wordPackName);
          if (wordPack) {
            if (wordPack && wordPack.wordsTotal) {
              wordPack.wordsTotal += 1;
            } else {
              wordPack.wordsTotal = 1;
            }
          }
        }));
        try {
          const { data: updatedWordData } = await queryFulfilled;
          dispatch(wordDataAPI.util?.updateQueryData('getAllWordData', undefined, (draft) => {
            const wordData = draft?.find((item) => item.id === args.wordDataId);
            if (wordData) {
              Object.assign(wordData, updatedWordData);
            }
          }));
        } catch (error) {
          patchResult.undo();
        }
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
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        const patchResult = dispatch(wordPacksAPI.util?.updateQueryData('getAllWordPacks', undefined, (draft) => {
          const wordPack = draft?.find((item) => item?.name === args.wordPackName);
          if (wordPack && wordPack.wordsTotal) {
            wordPack.wordsTotal -= 1;
          }
        }));
        try {
          const { data: updatedWordData } = await queryFulfilled;
          dispatch(wordDataAPI.util?.updateQueryData('getAllWordData', undefined, (draft) => {
            const wordData = draft?.find((item) => item?.id === args.wordDataId);
            if (wordData) {
              Object.assign(wordData, updatedWordData);
            }
          }));
        } catch (error) {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const {
  useGetAllWordDataQuery,
  useAddCustomWordPackToWordDataMutation,
  useAddCustomWordPackToWordDataByWordPackNameMutation,
  useRemoveCustomWordPackFromWordDataMutation,
} = wordDataAPI;
