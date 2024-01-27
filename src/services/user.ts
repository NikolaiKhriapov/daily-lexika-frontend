import axios, { AxiosResponse } from 'axios';
import { ApiEndpointsUsers } from '@API/apiMethods';
import { LocalStorage } from '@utils/constants';
import { UserDTO } from '@utils/types';

const getAuthConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem(LocalStorage.ACCESS_TOKEN)}`,
  },
});

export const updateUserInfo = async (userDTO: UserDTO): Promise<AxiosResponse<void>> => {
  try {
    return await axios.patch(ApiEndpointsUsers.updateUserInfo(), userDTO, getAuthConfig());
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteAccount = async (): Promise<AxiosResponse<void>> => {
  try {
    return await axios.delete(ApiEndpointsUsers.deleteAccount(), getAuthConfig());
  } catch (error) {
    console.error(error);
    throw error;
  }
};
