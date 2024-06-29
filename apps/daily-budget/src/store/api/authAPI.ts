import { API } from '@daily-budget/store/api/API';
import { ApiEndpointsAuthorization } from '@daily-budget/utils/apiMethods';
import { AuthenticationRequest, AuthenticationResponse, RegistrationRequest } from '@library/daily-budget';
import { QueryMethod } from '@library/shared/utils';

export const authAPI = API.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<AuthenticationResponse, RegistrationRequest>({
      query: (registrationRequest: RegistrationRequest) => ({
        url: ApiEndpointsAuthorization.register(),
        method: QueryMethod.POST,
        body: registrationRequest,
      }),
    }),
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
  useRegisterMutation,
} = authAPI;
