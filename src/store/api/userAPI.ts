import { apiSlice } from '@store/api//apiSlice';
import { ApiEndpointsUsers } from '@utils/apiMethods';
import { QueryMethods } from '@utils/constants';
import { PasswordUpdateRequest, UserDTO } from '@utils/types';

export const userAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserInfo: builder.query<UserDTO, void>({
      query: () => ({
        url: ApiEndpointsUsers.getUserInfo(),
        method: QueryMethods.GET,
      }),
      providesTags: ['User'],
    }),
    updateUserInfo: builder.mutation<UserDTO, UserDTO>({
      query: (userDTO: UserDTO) => ({
        url: ApiEndpointsUsers.updateUserInfo(),
        method: QueryMethods.PATCH,
        body: userDTO,
      }),
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        const patchResult = dispatch(userAPI.util?.updateQueryData('getUserInfo', undefined, (draft) => {
          if (draft) {
            draft.name = args.name;
          }
        }));
        try {
          const { data: updatedUserInfo } = await queryFulfilled;
          dispatch(userAPI.util?.updateQueryData('getUserInfo', undefined, (draft) => {
            if (draft) {
              Object.assign(draft, updatedUserInfo);
            }
          }));
        } catch (error) {
          patchResult.undo();
        }
      },

    }),
    updatePassword: builder.mutation<void, PasswordUpdateRequest>({
      query: (passwordUpdateRequest: PasswordUpdateRequest) => ({
        url: ApiEndpointsUsers.updatePassword(),
        method: QueryMethods.PATCH,
        body: passwordUpdateRequest,
      }),
    }),
    deleteAccount: builder.mutation<void, void>({
      query: () => ({
        url: ApiEndpointsUsers.deleteAccount(),
        method: QueryMethods.DELETE,
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useGetUserInfoQuery,
  useUpdateUserInfoMutation,
  useUpdatePasswordMutation,
  useDeleteAccountMutation,
} = userAPI;
