import React, { useState } from 'react';
import { FiBell } from 'react-icons/fi';
import styled from 'styled-components';
import { ColorMode, Menu, MenuButton, MenuDivider, useColorMode, useDisclosure } from '@chakra-ui/react';
import { useGetAllNotificationsQuery, useReadNotificationMutation } from '@store/api/notificationsAPI';
import { Breakpoint, ButtonType, FontWeight, Size } from '@utils/constants';
import { mediaBreakpointUp } from '@utils/functions';
import { theme } from '@utils/theme';
import { NotificationDto } from '@utils/types';
import NotificationsWindow from '@components/app/navbar/app/notifications/NotificationsWindow';
import NotificationWindow from '@components/app/navbar/app/notifications/NotificationWindow';
import Button from '@components/ui-common/basic/Button';
import MenuItem from '@components/ui-common/basic/MenuItem';
import MenuList from '@components/ui-common/basic/MenuList';
import RedDot from '@components/ui-common/basic/RedDot';
import Text from '@components/ui-common/basic/Text';
import ButtonsContainer from '@components/ui-common/complex/ButtonsContainer';
import DateHelper from '@helpers/DateHelper';

export default function NotificationsComponent() {
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedNotification, setSelectedNotification] = useState<NotificationDto | null>(null);

  const { data: allNotifications = [] } = useGetAllNotificationsQuery();
  const [readNotification] = useReadNotificationMutation();

  const unreadNotifications = allNotifications.filter((notificationDTO) => !notificationDTO.isRead);

  const handleNotificationClick = (notification: NotificationDto) => {
    readNotification(notification.notificationId);
    setSelectedNotification(notification);
  };

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
                    {DateHelper.convertStringToDate(notificationDTO.sentAt)}
                  </Text>
                </MenuItemStyled>
                {index < allNotifications.length - 1 && <MenuDivider />}
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
              isOpen={isOpen}
              modalContent={(
                <NotificationsWindow
                  isOpen={isOpen}
                  onClose={onClose}
                  allNotificationsDTO={allNotifications}
                />
              )}
            />
            {selectedNotification && (
              <NotificationWindow
                selectedNotification={selectedNotification}
                onClose={() => setSelectedNotification(null)}
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
  width: fit-content !important;

  ${mediaBreakpointUp(Breakpoint.TABLET)} {
    width: 100% !important;
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
