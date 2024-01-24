import axios, { AxiosResponse } from 'axios';
import { ApiEndpointsAuthorization } from '@API/apiMethods';
import { AuthenticationRequest, AuthenticationResponse, RegistrationRequest } from '@utils/types';

export const register = async (registrationRequest: RegistrationRequest): Promise<AxiosResponse<AuthenticationResponse>> => {
  try {
    return await axios.post(ApiEndpointsAuthorization.register, registrationRequest);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const login = async (authenticationRequest: AuthenticationRequest): Promise<AxiosResponse<AuthenticationResponse>> => {
  try {
    return await axios.post(ApiEndpointsAuthorization.login, authenticationRequest);
  } catch (error) {
    console.error(error);
    throw error;
  }
};
