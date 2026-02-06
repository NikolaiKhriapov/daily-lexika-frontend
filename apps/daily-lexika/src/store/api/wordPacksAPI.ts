import { API } from '@daily-lexika/store/api/API';
import { ApiEndpointsWordPacks } from '@daily-lexika/utils/apiMethods';
import { placeholderWordPack } from '@daily-lexika/utils/placeholderEntities';
import { Category, WordPackUserDto } from '@library/daily-lexika';
import { providesList, QueryMethod } from '@library/shared/utils';

export const wordPacksAPI = API.injectEndpoints({
  endpoints: (builder) => ({
    getAllWordPacks: builder.query<WordPackUserDto[], void>({
      query: () => ({
        url: ApiEndpointsWordPacks.getAllWordPacks(),
        method: QueryMethod.GET,
      }),
      transformResponse: (response: WordPackUserDto[]) => response.filter((wordPack) => ((wordPack.category.toLowerCase() !== Category.CUSTOM.toLowerCase()) ? (wordPack.wordsTotal! > 0) : wordPack)),
      providesTags: (result) => providesList(result, 'WordPacks'),
    }),
    createCustomWordPack: builder.mutation<void, WordPackUserDto>({
      query: (wordPackUserDto) => ({
        url: ApiEndpointsWordPacks.createCustomWordPack(),
        body: wordPackUserDto,
        method: QueryMethod.POST,
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
    deleteCustomWordPack: builder.mutation<void, number>({
      query: (wordPackId) => ({
        url: ApiEndpointsWordPacks.deleteCustomWordPack(wordPackId),
        method: QueryMethod.DELETE,
      }),
      invalidatesTags: [{ type: 'WordPacks', id: 'LIST' }, { type: 'Reviews', id: 'LIST' }],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const patchResult = dispatch(wordPacksAPI.util?.updateQueryData('getAllWordPacks', undefined, (draft) => {
          const wordPackIndex = draft.findIndex((item) => item.id === arg);
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
  }),
});

export const {
  useGetAllWordPacksQuery,
  useCreateCustomWordPackMutation,
  useDeleteCustomWordPackMutation,
} = wordPacksAPI;
