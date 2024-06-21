import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Button as ChakraButton, ColorMode, MenuDivider, useColorMode } from '@chakra-ui/react';
import { useReadNotificationMutation } from '@store/api/notificationsAPI';
import { useGetUserQuery } from '@store/api/userAPI';
import { Breakpoint, FontWeight, Size } from '@utils/constants';
import { mediaBreakpointUp } from '@utils/functions';
import { theme } from '@utils/theme';
import { NotificationDto } from '@utils/types';
import NotificationWindow from '@components/app/navbar/app/notifications/NotificationWindow';
import RedDot from '@components/ui-common/basic/RedDot';
import Text from '@components/ui-common/basic/Text';
import Modal from '@components/ui-common/complex/Modal';
import DateHelper from '@helpers/DateHelper';
import LocaleHelper from '@helpers/LocaleHelper';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  allNotificationsDTO: NotificationDto[];
};

export default function NotificationsWindow(props: Props) {
  const { isOpen, onClose, allNotificationsDTO } = props;

  const { colorMode } = useColorMode();
  const { t } = useTranslation();
  const { data: user } = useGetUserQuery();
  const [readNotification] = useReadNotificationMutation();
  const [selectedNotification, setSelectedNotification] = useState<NotificationDto | null>(null);

  const onClick = (notification: NotificationDto) => {
    readNotification(notification.notificationId);
    setSelectedNotification(notification);
  };

  if (!user) return <></>;

  return (
    <Modal
      size={Size.LG}
      isOpen={isOpen}
      onClose={onClose}
      header={t('NotificationsWindow.header')}
      body={(
        <Container>
          {allNotificationsDTO.map((notificationDTO, index) => (
            <ButtonContainer key={index}>
              <NotificationButton $colorMode={colorMode} onClick={() => onClick(notificationDTO)}>
                <SubjectAndDateContainer>
                  <Text
                    size={{ base: Size.SM, md: Size.MD, xl: Size.MD }}
                    fontWeight={notificationDTO.isRead ? FontWeight.NORMAL : FontWeight.SEMIBOLD}
                    textAlign='left'
                  >
                    {notificationDTO.subject}
                  </Text>
                  <Text
                    size={Size.SM}
                    fontWeight={notificationDTO.isRead ? FontWeight.NORMAL : FontWeight.SEMIBOLD}
                    display={{ base: 'none', md: 'unset' }}
                  >
                    {DateHelper.convertOffsetDateTimeToDateString(notificationDTO.sentAt, LocaleHelper.getLocaleFromUser(user))}
                  </Text>
                </SubjectAndDateContainer>
                <RedDotContainer>
                  {!notificationDTO.isRead && <RedDot />}
                </RedDotContainer>
              </NotificationButton>
              {index < allNotificationsDTO.length - 1 && <MenuDivider />}
            </ButtonContainer>
          ))}
          {selectedNotification && (
            <NotificationWindow
              selectedNotification={selectedNotification}
              onClose={() => setSelectedNotification(null)}
            />
          )}
        </Container>
      )}
    />
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 0;
  width: 320px;
  max-width: 75vw;

  ${mediaBreakpointUp(Breakpoint.TABLET)} {
    width: 460px;
    max-width: 460px;
  }
`;

const ButtonContainer = styled.div`
  padding-left: 0;
  width: 100%;

  ${mediaBreakpointUp(Breakpoint.DESKTOP)} {
    width: 80vh;
    max-width: 100%;
  }
`;

const NotificationButton = styled(ChakraButton)<{ $colorMode: ColorMode }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between !important;
  padding-left: 7px !important;
  padding-right: 7px !important;
  background-color: ${({ $colorMode }) => theme.colors[$colorMode].bgColor} !important;
  height: 30px !important;
  width: 100%;

  ${mediaBreakpointUp(Breakpoint.TABLET)} {
    height: 35px !important;
    width: 460px;
  }

  ${mediaBreakpointUp(Breakpoint.DESKTOP)} {
    height: 40px !important;
  }

  &:hover {
    background-color: ${({ $colorMode }) => theme.colors[$colorMode].hoverBgColor} !important;
  }
`;

const SubjectAndDateContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  ${mediaBreakpointUp(Breakpoint.TABLET)} {
    flex-direction: row;
    justify-content: space-between !important;
  }
`;

const RedDotContainer = styled.div``;
