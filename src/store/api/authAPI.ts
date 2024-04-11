import { API } from '@store/api/API';
import { ApiEndpointsAuthorization } from '@utils/app/apiMethods';
import { QueryMethods } from '@utils/constants';
import { AuthenticationRequest, AuthenticationResponse, RegistrationRequest } from '@utils/types';

export const authAPI = API.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<AuthenticationResponse, RegistrationRequest>({
      query: (registrationRequest: RegistrationRequest) => ({
        url: ApiEndpointsAuthorization.register(),
        method: QueryMethods.POST,
        body: registrationRequest,
      }),
    }),
    login: builder.mutation<AuthenticationResponse, AuthenticationRequest>({
      query: (authenticationRequest: AuthenticationRequest) => ({
        url: ApiEndpointsAuthorization.login(),
        method: QueryMethods.POST,
        body: authenticationRequest,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
} = authAPI;
