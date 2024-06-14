import { API } from '@store/api/API';
import { ApiEndpointsUsers } from '@utils/app/apiMethods';
import { QueryMethod } from '@utils/constants';
import { AccountDeletionRequest, PasswordUpdateRequest, UserDto } from '@utils/types';

export const userAPI = API.injectEndpoints({
  endpoints: (builder) => ({
    getUserInfo: builder.query<UserDto, void>({
      query: () => ({
        url: ApiEndpointsUsers.getUserInfo(),
        method: QueryMethod.GET,
      }),
      providesTags: ['User'],
    }),
    updateUserInfo: builder.mutation<UserDto, UserDto>({
      query: (userDTO: UserDto) => ({
        url: ApiEndpointsUsers.updateUserInfo(),
        method: QueryMethod.PATCH,
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
      query: (request: PasswordUpdateRequest) => ({
        url: ApiEndpointsUsers.updatePassword(),
        method: QueryMethod.PATCH,
        body: request,
      }),
    }),
    deleteAccount: builder.mutation<void, AccountDeletionRequest>({
      query: (request: AccountDeletionRequest) => ({
        url: ApiEndpointsUsers.deleteAccount(),
        method: QueryMethod.DELETE,
        body: request,
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
