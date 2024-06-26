import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FiBell } from 'react-icons/fi';
import styled from 'styled-components';
import { ColorMode, Menu, MenuButton, MenuDivider, useColorMode, useDisclosure } from '@chakra-ui/react';
import NotificationsWindow from '@daily-lexika/components/app/navbar/notifications/NotificationsWindow';
import NotificationWindow from '@daily-lexika/components/app/navbar/notifications/NotificationWindow';
import LocaleHelper from '@daily-lexika/helpers/LocaleHelper';
import { useGetAllNotificationsQuery, useReadNotificationMutation } from '@daily-lexika/store/api/notificationsAPI';
import { useGetUserQuery } from '@daily-lexika/store/api/userAPI';
import { NotificationDto } from '@library/daily-lexika';
import { Button, ButtonsContainer,ButtonType, MenuItem, MenuList, RedDot, Text } from '@library/shared/ui';
import { Breakpoint, DateTimeUtil, FontWeight, mediaBreakpointUp, Size, theme } from '@library/shared/utils';

export default function NotificationsComponent() {
  const { colorMode } = useColorMode();
  const { t } = useTranslation();
  const { data: user } = useGetUserQuery();
  const { data: allNotifications = [] } = useGetAllNotificationsQuery();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [readNotification] = useReadNotificationMutation();
  const [selectedNotification, setSelectedNotification] = useState<NotificationDto | null>(null);

  const unreadNotifications = allNotifications.filter((notificationDTO) => !notificationDTO.isRead);

  const handleNotificationClick = (notification: NotificationDto) => {
    readNotification(notification.notificationId);
    setSelectedNotification(notification);
  };

  if (!user) return <></>;

  return (
    <Notifications $colorMode={colorMode}>
      <Menu>
        <MenuButton aria-label="notifications-button">
          <ButtonContainer>
            <FiBell />{unreadNotifications.length > 0 && <RedDot />}
          </ButtonContainer>
        </MenuButton>
        <MenuList width={{ base: 290, md: 400 }}>
          {unreadNotifications.length > 0
            ? (unreadNotifications.map((notificationDTO, index) => (
              <NotificationContainer key={index}>
                <MenuItemStyled onClick={() => handleNotificationClick(notificationDTO)}>
                  <Text size={Size.MD} fontWeight={FontWeight.SEMIBOLD}>
                    {notificationDTO.subject}
                  </Text>
                  <Text size={Size.SM} fontWeight={FontWeight.SEMIBOLD} display={{ base: 'none', md: 'unset' }}>
                    {DateTimeUtil.convertOffsetDateTimeToDateString(notificationDTO.sentAt, LocaleHelper.getLocaleFromUser(user))}
                  </Text>
                </MenuItemStyled>
                {index < allNotifications.length - 1 && <MenuDivider />}
              </NotificationContainer>
            )))
            : (
              <NoNotificationsContainer>
                <Text>{t('NotificationsComponent.noNewNotifications')}</Text>
              </NoNotificationsContainer>
            )}
          <MenuDivider />
          <ButtonsContainer>
            <Button
              buttonText={t('NotificationsComponent.showAllButton')}
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
