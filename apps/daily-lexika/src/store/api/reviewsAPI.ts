import { API } from '@daily-lexika/store/api/API';
import { ApiEndpointsReviews } from '@daily-lexika/utils/apiMethods';
import { placeholderReview } from '@daily-lexika/utils/placeholderEntities';
import { ReviewDto } from '@library/daily-lexika';
import { providesList, QueryMethod } from '@library/shared/utils';

export const reviewsAPI = API.injectEndpoints({
  endpoints: (builder) => ({
    getAllReviews: builder.query<ReviewDto[], void>({
      query: () => ({
        url: ApiEndpointsReviews.getAllReviews(),
        method: QueryMethod.GET,
      }),
      transformResponse: (response: ReviewDto[]) => response.sort((a, b) => a.wordPackDto.name.localeCompare(b.wordPackDto.name)),
      providesTags: (result) => providesList(result, 'Reviews'),
    }),
    createReview: builder.mutation<ReviewDto, ReviewDto>({
      query: (reviewDTO) => ({
        url: ApiEndpointsReviews.createReview(),
        body: reviewDTO,
        method: QueryMethod.POST,
      }),
      invalidatesTags: [{ type: 'Reviews', id: 'LIST' }, { type: 'WordPacks', id: 'LIST' }, 'Statistics'],
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        const patchResult = dispatch(reviewsAPI.util?.updateQueryData('getAllReviews', undefined, (draft) => {
          if (draft) {
            draft.push(placeholderReview);
          }
        }));
        try {
          await queryFulfilled;
        } catch (error) {
          patchResult.undo();
        }
      },
    }),
    updateReview: builder.mutation<ReviewDto, { reviewId: number, reviewDTO: ReviewDto }>({
      query: ({ reviewId, reviewDTO }) => ({
        url: ApiEndpointsReviews.updateReview(reviewId),
        method: QueryMethod.PATCH,
        body: reviewDTO,
      }),
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        try {
          const { data: updatedReview } = await queryFulfilled;
          dispatch(reviewsAPI.util?.updateQueryData('getAllReviews', undefined, (draft) => {
            const review = draft?.find((item) => item.id === args.reviewId);
            if (review) {
              Object.assign(review, updatedReview);
            }
          }));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    refreshReview: builder.mutation<ReviewDto, number>({
      query: (reviewId) => ({
        url: ApiEndpointsReviews.refreshReview(reviewId),
        method: QueryMethod.PATCH,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data: updatedReview } = await queryFulfilled;
          dispatch(reviewsAPI.util?.updateQueryData('getAllReviews', undefined, (draft) => {
            const review = draft?.find((item) => item.id === arg);
            if (review) {
              Object.assign(review, updatedReview);
            }
          }));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    deleteReview: builder.mutation<void, number>({
      query: (reviewId) => ({
        url: ApiEndpointsReviews.deleteReview(reviewId),
        method: QueryMethod.DELETE,
      }),
      invalidatesTags: [{ type: 'Reviews', id: 'LIST' }, { type: 'WordPacks', id: 'LIST' }, 'Statistics'],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const patchResult = dispatch(reviewsAPI.util?.updateQueryData('getAllReviews', undefined, (draft) => {
          const reviewIndex = draft.findIndex((item) => item.id === arg);
          if (reviewIndex !== -1) {
            draft.splice(reviewIndex, 1);
          }
        }));
        try {
          await queryFulfilled;
        } catch (error) {
          patchResult.undo();
        }
      },
    }),
    processReviewAction: builder.mutation<ReviewDto, { reviewId: number; answer: boolean | null }>({
      query: ({ reviewId, answer = null }) => ({
        url: ApiEndpointsReviews.processReviewAction(reviewId, answer),
        method: QueryMethod.GET,
      }),
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        try {
          const { data: updatedReview } = await queryFulfilled;
          dispatch(reviewsAPI.util?.updateQueryData('getAllReviews', undefined, (draft) => {
            const review = draft?.find((item) => item.id === args.reviewId);
            if (review) {
              Object.assign(review, updatedReview);
            }
          }));
        } catch (error) {
          // @ts-expect-error(need to add the Error object)
          if (error.error.data.message === 'Review not found.') {
            dispatch(reviewsAPI.util?.invalidateTags(['Reviews']));
          }
        }
      },
    }),
  }),
});

export const {
  useGetAllReviewsQuery,
  useCreateReviewMutation,
  useUpdateReviewMutation,
  useRefreshReviewMutation,
  useDeleteReviewMutation,
  useProcessReviewActionMutation,
} = reviewsAPI;
