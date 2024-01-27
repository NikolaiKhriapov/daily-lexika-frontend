import axios, { AxiosResponse } from 'axios';
import { ApiEndpointsNotifications } from '@API/apiMethods';
import { LocalStorage } from '@utils/constants';
import { NotificationDTO } from '@utils/types';

const getAuthConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem(LocalStorage.ACCESS_TOKEN)}`,
  },
});

export const getAllNotifications = async (): Promise<AxiosResponse<NotificationDTO[]>> => {
  try {
    return await axios.get(ApiEndpointsNotifications.getAllNotifications(), getAuthConfig());
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const readNotification = async (notificationId: number): Promise<AxiosResponse<void>> => {
  try {
    return await axios.patch(ApiEndpointsNotifications.readNotification(notificationId), '', getAuthConfig());
  } catch (error) {
    console.error(error);
    throw error;
  }
};
