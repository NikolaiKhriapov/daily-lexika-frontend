import axios, { AxiosResponse } from 'axios';
import { ApiEndpointsWordData } from '@API/apiMethods';
import { LocalStorage } from '@utils/constants';
import { WordDataDTO } from '@utils/types';

const getAuthConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem(LocalStorage.ACCESS_TOKEN)}`,
  },
});

export const getAllWordData = async (): Promise<AxiosResponse<WordDataDTO[]>> => {
  try {
    return await axios.get(ApiEndpointsWordData.getAllWordData(), getAuthConfig());
  } catch (error) {
    console.error(error);
    throw error;
  }
};
