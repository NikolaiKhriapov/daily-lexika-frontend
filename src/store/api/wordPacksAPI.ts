import { API, providesList } from '@store/api/API';
import { wordDataAPI } from '@store/api/wordDataAPI';
import { ApiEndpointsWordPacks } from '@utils/apiMethods';
import { QueryMethods } from '@utils/constants';
import { Category, placeholderWordPack, WordDataDto, WordDto, WordPackDto } from '@utils/types';

export const wordPacksAPI = API.injectEndpoints({
  endpoints: (builder) => ({
    getAllWordPacks: builder.query<WordPackDto[], void>({
      query: () => ({
        url: ApiEndpointsWordPacks.getAllWordPacks(),
        method: QueryMethods.GET,
      }),
      transformResponse: (response: WordPackDto[]) => response.filter((wordPack) => ((wordPack.category.toLowerCase() !== Category.CUSTOM.toLowerCase()) ? (wordPack.totalWords! > 0) : wordPack)),
      providesTags: (result) => providesList(result, 'WordPacks'),
    }),
    createCustomWordPack: builder.mutation<void, WordPackDto>({
      query: (wordPackDto) => ({
        url: ApiEndpointsWordPacks.createCustomWordPack(),
        body: wordPackDto,
        method: QueryMethods.POST,
      }),
      invalidatesTags: [{ type: 'Reviews', id: 'LIST' }, { type: 'WordPacks', id: 'LIST' }],
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        const patchResult = dispatch(wordPacksAPI.util?.updateQueryData('getAllWordPacks', undefined, (draft) => {
          if (draft) {
            draft.push(placeholderWordPack);
          }
        }));
        try {
          await queryFulfilled;
        } catch (error) {
          patchResult.undo();
        }
      },
    }),
    deleteCustomWordPack: builder.mutation<void, string>({
      query: (wordPackName) => ({
        url: ApiEndpointsWordPacks.deleteCustomWordPack(wordPackName),
        method: QueryMethods.DELETE,
      }),
      invalidatesTags: [{ type: 'WordPacks', id: 'LIST' }, { type: 'Reviews', id: 'LIST' }],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const patchResult = dispatch(wordPacksAPI.util?.updateQueryData('getAllWordPacks', undefined, (draft) => {
          const wordPackIndex = draft.findIndex((item) => item.name === arg);
          if (wordPackIndex !== -1) {
            draft.splice(wordPackIndex, 1);
          }
        }));
        try {
          await queryFulfilled;
        } catch (error) {
          patchResult.undo();
        }
      },
    }),
    getAllWordsForWordPack: builder.query<WordDto[], { wordPackName: string, page: number, size: number }>({
      query: ({ wordPackName, page, size }) => ({
        url: ApiEndpointsWordPacks.getAllWordsForWordPack(wordPackName, page, size),
        method: QueryMethods.GET,
      }),
      providesTags: ['AllWordsForWordPack'],
    }),
    addWordToCustomWordPack: builder.mutation<WordDataDto, { wordPackName: string, wordDataId: number }>({
      query: ({ wordPackName, wordDataId }) => ({
        url: ApiEndpointsWordPacks.addWordToCustomWordPack(wordPackName, wordDataId),
        method: QueryMethods.GET,
      }),
      invalidatesTags: ['AllWordsForWordPack'],
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        const patchResult = dispatch(wordPacksAPI.util?.updateQueryData('getAllWordPacks', undefined, (draft) => {
          const wordPack = draft?.find((item) => item.name === args.wordPackName);
          if (wordPack) {
            if (wordPack && wordPack.totalWords) {
              wordPack.totalWords += 1;
            } else {
              wordPack.totalWords = 1;
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
    removeWordFromCustomWordPack: builder.mutation<WordDataDto, { wordPackName: string, wordDataId: number }>({
      query: ({ wordPackName, wordDataId }) => ({
        url: ApiEndpointsWordPacks.removeWordFromCustomWordPack(wordPackName, wordDataId),
        method: QueryMethods.GET,
      }),
      invalidatesTags: ['AllWordsForWordPack'],
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        const patchResult = dispatch(wordPacksAPI.util?.updateQueryData('getAllWordPacks', undefined, (draft) => {
          const wordPack = draft?.find((item) => item?.name === args.wordPackName);
          if (wordPack && wordPack.totalWords) {
            wordPack.totalWords -= 1;
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
  useGetAllWordPacksQuery,
  useCreateCustomWordPackMutation,
  useDeleteCustomWordPackMutation,
  useGetAllWordsForWordPackQuery,
  useAddWordToCustomWordPackMutation,
  useRemoveWordFromCustomWordPackMutation,
} = wordPacksAPI;
