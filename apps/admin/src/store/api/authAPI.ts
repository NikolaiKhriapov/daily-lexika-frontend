import { API } from '@admin/store/api/API';
import { ApiEndpointsAuthorization } from '@admin/utils/apiMethods';
import { AuthenticationRequest, AuthenticationResponse } from '@library/admin';
import { QueryMethod } from '@library/shared/utils';

export const authAPI = API.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthenticationResponse, AuthenticationRequest>({
      query: (authenticationRequest: AuthenticationRequest) => ({
        url: ApiEndpointsAuthorization.login(),
        method: QueryMethod.POST,
        body: authenticationRequest,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
} = authAPI;
