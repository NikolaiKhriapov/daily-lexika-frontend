import React from 'react';
import { MdOutlineWidgets } from 'react-icons/md';
import styled from 'styled-components';
import { ColorMode, useColorMode, useDisclosure } from '@chakra-ui/react';
import { ButtonType, Size } from '@utils/constants';
import { theme } from '@utils/theme';
import UpcomingUpdatesTable from '@components/app/navbar/app/upcoming-updates/UpcomingUpdatesTable';
import Button from '@components/ui-common/basic/Button';
import Modal from '@components/ui-common/complex/Modal';

export default function UpcomingUpdatesComponent() {
  const { colorMode } = useColorMode();
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
          header='Coming Soon'
          isHeaderCentered
          body={<UpcomingUpdatesTable />}
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
