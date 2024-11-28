import { API } from '@daily-budget/store/api/API';
import { ApiEndpointsUsers } from '@daily-budget/utils/apiMethods';
import { AccountDeletionRequest, PasswordUpdateRequest, UserDto } from '@library/daily-budget';
import { QueryMethod } from '@library/shared/utils';

export const userAPI = API.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<UserDto, void>({
      query: () => ({
        url: ApiEndpointsUsers.getUser(),
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
  useGetUserQuery,
  useUpdateUserInfoMutation,
  useUpdatePasswordMutation,
  useDeleteAccountMutation,
} = userAPI;
