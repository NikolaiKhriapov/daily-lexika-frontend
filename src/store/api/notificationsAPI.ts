import { API, providesList } from '@store/api/API';
import { ApiEndpointsNotifications } from '@utils/apiMethods';
import { QueryMethods } from '@utils/constants';
import { NotificationDto } from '@utils/types';

export const notificationsAPI = API.injectEndpoints({
  endpoints: (builder) => ({
    getAllNotifications: builder.query<NotificationDto[], void>({
      query: () => ({
        url: ApiEndpointsNotifications.getAllNotifications(),
        method: QueryMethods.GET,
      }),
      providesTags: (result) => providesList(result, 'Notifications'),
    }),
    readNotification: builder.mutation<void, number>({
      query: (notificationId: number) => ({
        url: ApiEndpointsNotifications.readNotification(notificationId),
        method: QueryMethods.PATCH,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const patchResult = dispatch(notificationsAPI.util?.updateQueryData('getAllNotifications', undefined, (draft) => {
          const notification = draft?.find((item) => item.notificationId === arg);
          if (notification) {
            notification.isRead = true;
          }
        }));
        try {
          await queryFulfilled;
        } catch (error) {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const {
  useGetAllNotificationsQuery,
  useReadNotificationMutation,
} = notificationsAPI;
