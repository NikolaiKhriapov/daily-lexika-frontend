import axios from 'axios';
import { ApiEndpointsStatistics, ApiEndpointsUsers } from '@API/apiMethods';
import { LocalStorage } from '@utils/constants';
import { UserDTO } from '@utils/types';

const getAuthConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem(LocalStorage.ACCESS_TOKEN)}`,
  },
});

export const showUserAccount = async () => {
  try {
    return await axios.get(ApiEndpointsUsers.showUserAccount(), getAuthConfig());
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateUserInfo = async (userDTO: UserDTO) => {
  try {
    return await axios.patch(ApiEndpointsUsers.updateUserInfo(), userDTO, getAuthConfig());
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteAccount = async () => {
  try {
    return await axios.delete(ApiEndpointsUsers.deleteAccount(), getAuthConfig());
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getStatistics = async () => {
  try {
    return await axios.get(ApiEndpointsStatistics.getStatistics(), getAuthConfig());
  } catch (error) {
    console.error(error);
    throw error;
  }
};
