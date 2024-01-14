import React, { useContext, useState } from 'react';
import { FiBell } from 'react-icons/fi';
import styled from 'styled-components';
import { ColorMode, Menu, MenuButton, MenuDivider, useColorMode, useDisclosure } from '@chakra-ui/react';
import { NotificationsContext } from '@context/NotificationsContext';
import { readNotification } from '@services/notifications';
import { Breakpoint, ButtonType, FontWeight, Size } from '@utils/constants';
import { mediaBreakpointUp } from '@utils/functions';
import { theme } from '@utils/theme';
import { NotificationDTO } from '@utils/types';
import Button from '@components/common/basic/Button';
import MenuItem from '@components/common/basic/MenuItem';
import MenuList from '@components/common/basic/MenuList';
import RedDot from '@components/common/basic/RedDot';
import Text from '@components/common/basic/Text';
import ButtonsContainer from '@components/common/complex/ButtonsContainer';
import NotificationsWindow from '@components/shared/navbar/NotificationsWindow';
import NotificationWindow from '@components/shared/navbar/NotificationWindow';

export default function NotificationsComponent() {
  const { colorMode } = useColorMode();
  const { allNotificationsDTO, setAllNotificationsDTO } = useContext(NotificationsContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedNotification, setSelectedNotification] = useState<NotificationDTO | null>(null);

  const handleNotificationClick = (notificationDTO: NotificationDTO) => {
    readNotification(notificationDTO.notificationId);
    setSelectedNotification(notificationDTO);
    setAllNotificationsDTO((prevNotificationsDTO) => prevNotificationsDTO.map((notification) => {
      if (notification.notificationId === notificationDTO.notificationId) {
        return { ...notification, isRead: true };
      }
      return notification;
    }));
  };

  const handleCloseNotificationModal = () => setSelectedNotification(null);

  const formattedDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formattedDateTime = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const unreadNotifications = allNotificationsDTO
    .filter((notificationDTO) => !notificationDTO.isRead);

  return (
    <Notifications $colorMode={colorMode}>
      <Menu>
        <MenuButton>
          <ButtonContainer>
            <FiBell />{unreadNotifications.length > 0 && <RedDot />}
          </ButtonContainer>
        </MenuButton>
        <MenuList width={{ base: 290, md: 400 }}>
          {unreadNotifications.length > 0
            ? (unreadNotifications.map((notificationDTO, index) => (
              <NotificationContainer key={index}>
                <MenuItemStyled onClick={() => handleNotificationClick(notificationDTO)}>
                  <Text
                    size={Size.MD}
                    fontWeight={FontWeight.SEMIBOLD}
                  >
                    {notificationDTO.subject}
                  </Text>
                  <Text
                    size={Size.SM}
                    fontWeight={FontWeight.SEMIBOLD}
                    display={{ base: 'none', md: 'unset' }}
                  >
                    {formattedDate(notificationDTO.sentAt)}
                  </Text>
                </MenuItemStyled>
                {index < allNotificationsDTO.length - 1 && <MenuDivider />}
              </NotificationContainer>
            )))
            : (
              <NoNotificationsContainer>
                <Text>No new notifications</Text>
              </NoNotificationsContainer>
            )}
          <MenuDivider />
          <ButtonsContainer>
            <Button
              buttonText='Show all notifications'
              buttonType={ButtonType.BUTTON}
              size={Size.SM}
              onClick={onOpen}
            />
            {isOpen && (
              <NotificationsWindow
                isOpen={isOpen}
                onClose={onClose}
                formattedDate={formattedDate}
                allNotificationsDTO={allNotificationsDTO}
                handleNotificationClick={handleNotificationClick}
              />
            )}
            {selectedNotification && (
              <NotificationWindow
                formattedDateTime={formattedDateTime}
                handleCloseNotificationModal={handleCloseNotificationModal}
                selectedNotification={selectedNotification}
              />
            )}
          </ButtonsContainer>
        </MenuList>
      </Menu>
    </Notifications>
  );
}

const Notifications = styled.div<{ $colorMode: ColorMode }>`
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: ${({ $colorMode }) => theme.colors[$colorMode].hoverBgColor} !important;
  }
`;

const ButtonContainer = styled.div`
  width: 48px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 0;
`;

const NotificationContainer = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${mediaBreakpointUp(Breakpoint.TABLET)} {
    height: 40px;
  }
`;

const MenuItemStyled = styled(MenuItem)`
  display: flex;
  flex-direction: column;

  ${mediaBreakpointUp(Breakpoint.TABLET)} {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const NoNotificationsContainer = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
