import axios, { AxiosResponse } from 'axios';
import { ApiEndpointsStatistics } from '@API/apiMethods';
import { LocalStorage } from '@utils/constants';
import { StatisticsDTO } from '@utils/types';

const getAuthConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem(LocalStorage.ACCESS_TOKEN)}`,
  },
});

export const getStatistics = async (): Promise<AxiosResponse<StatisticsDTO>> => {
  try {
    return await axios.get(ApiEndpointsStatistics.getStatistics(), getAuthConfig());
  } catch (error) {
    console.error(error);
    throw error;
  }
};
