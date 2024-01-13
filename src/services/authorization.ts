import axios from 'axios';
import { ApiEndpointsAuthorization } from '@API/apiMethods';
import { AuthenticationRequest, RegistrationRequest } from '@utils/types';

export const register = async (registrationRequest: RegistrationRequest) => {
  try {
    return await axios.post(ApiEndpointsAuthorization.register, registrationRequest);
  } catch (error) {
    console.error(error);
  }
};

export const login = async (authenticationRequest: AuthenticationRequest) => {
  try {
    return await axios.post(ApiEndpointsAuthorization.login, authenticationRequest);
  } catch (error) {
    console.error(error);
  }
};
