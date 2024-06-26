import { API } from '@admin/store/api/API';
import { ApiEndpointsUser } from '@admin/utils/apiMethods';
import { UserDto } from '@library/admin';
import { QueryMethod } from '@library/shared/utils';

export const userAPI = API.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<UserDto, void>({
      query: () => ({
        url: ApiEndpointsUser.getUser(),
        method: QueryMethod.GET,
      }),
      providesTags: ['User'],
    }),
  }),
});

export const {
  useGetUserQuery,
} = userAPI;
