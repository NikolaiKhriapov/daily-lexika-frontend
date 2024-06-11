import React from 'react';
import { useTranslation } from 'react-i18next';
import { MdOutlineWidgets } from 'react-icons/md';
import styled from 'styled-components';
import { ColorMode, useColorMode, useDisclosure } from '@chakra-ui/react';
import { ButtonType, Size } from '@utils/constants';
import { theme } from '@utils/theme';
import UpcomingUpdates from '@components/app/navbar/app/upcoming-updates/UpcomingUpdates';
import Button from '@components/ui-common/basic/Button';
import Modal from '@components/ui-common/complex/Modal';

export default function UpcomingUpdatesComponent() {
  const { colorMode } = useColorMode();
  const { t } = useTranslation();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <ButtonStyled
      buttonText={<MdOutlineWidgets />}
      buttonType={ButtonType.BUTTON}
      onClick={onOpen}
      isOpen={isOpen}
      $colorMode={colorMode}
      modalContent={(
        <Modal
          size={Size.MD}
          isOpen={isOpen}
          onClose={onClose}
          header={t('UpcomingUpdatesComponent.header')}
          isHeaderCentered
          body={<UpcomingUpdates />}
        />
      )}
    />
  );
}

const ButtonStyled = styled(Button)<{ $colorMode: ColorMode }>`
  border: none !important;
  background-color: ${({ $colorMode }) => theme.colors[$colorMode].background2} !important;

  &:hover {
    background-color: ${({ $colorMode }) => theme.colors[$colorMode].hoverBgColor} !important;
  }
`;
