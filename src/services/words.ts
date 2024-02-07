import axios, { AxiosResponse } from 'axios';
import { ApiEndpointsWords } from '@API/apiMethods';
import { LocalStorage } from '@utils/constants';
import { Status, WordDTO } from '@utils/types';

const getAuthConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem(LocalStorage.ACCESS_TOKEN)}`,
  },
});

export const getAllWordsByStatus = async (status: Status, page: number, size: number): Promise<AxiosResponse<WordDTO[]>> => {
  try {
    return await axios.get(ApiEndpointsWords.getAllWordsByStatus(status, page, size), getAuthConfig());
  } catch (error) {
    console.error(error);
    throw error;
  }
};
