import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import { AuthContext } from '@context/AuthContext';
import { getAllNotifications } from '@services/notifications';
import { NotificationDTO } from '@utils/types';

type Props = {
  allNotificationsDTO: NotificationDTO[];
  setAllNotificationsDTO: Dispatch<SetStateAction<NotificationDTO[]>>;
};

const NotificationsContext = React.createContext<Props>({
  allNotificationsDTO: [],
  setAllNotificationsDTO: () => {
  },
});

function NotificationsProvider({ children }: { children: any }) {
  const { user } = useContext(AuthContext);
  const [allNotificationsDTO, setAllNotificationsDTO] = useState<NotificationDTO[]>([]);

  const fetchAllNotificationsDTO = () => {
    getAllNotifications()
      .then((response) => {
        const { data } = response;
        setAllNotificationsDTO(data.sort((a, b) => new Date(b.sentAt).getTime() - new Date(a.sentAt).getTime()));
      })
      .catch((error) => console.error(error.code, error.response.data.message));
  };

  useEffect(() => {
    if (user !== null) {
      fetchAllNotificationsDTO();
    }
  }, [user]);

  return (
    <NotificationsContext.Provider value={{ allNotificationsDTO, setAllNotificationsDTO }}>
      {children}
    </NotificationsContext.Provider>
  );
}

export { NotificationsContext };
export default NotificationsProvider;
