import axios, { AxiosResponse } from 'axios';
import { ApiEndpointsWordData } from '@API/apiMethods';
import { LocalStorage } from '@utils/constants';
import { WordDataDTO } from '@utils/types';

const getAuthConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem(LocalStorage.ACCESS_TOKEN)}`,
  },
});

export const search = async (searchQuery: string): Promise<AxiosResponse<WordDataDTO[]>> => {
  try {
    return await axios.get(ApiEndpointsWordData.search(searchQuery), getAuthConfig());
  } catch (error) {
    console.error(error);
    throw error;
  }
};
