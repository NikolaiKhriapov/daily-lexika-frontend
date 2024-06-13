import React from 'react';
import styled from 'styled-components';
import {
  ColorMode, Modal as ChakraModal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay,
  ModalProps, useColorMode,
} from '@chakra-ui/react';
import { Breakpoint, Size } from '@utils/constants';
import {
  borderStyles, hiddenScrollbar, mediaBreakpointUp, nonHighlightableTap, nonSelectableText,
} from '@utils/functions';
import { theme } from '@utils/theme';

interface Props extends Omit<ModalProps, 'children'> {
  header: React.ReactNode;
  body: React.ReactNode;
  width?: string;
  height?: string;
  isHeaderCentered?: boolean;
  showCloseButton?: boolean;
}

export default function Modal(props: Props) {
  const { header, body, width, height, isHeaderCentered = false, showCloseButton = true, ...rest } = props;

  const { colorMode } = useColorMode();

  return (
    <ChakraModal isCentered {...rest} size={Size.XXXL}>
      <ModalOverlay />
      <ModalContentStyled $colorMode={colorMode} $width={width} $height={height}>
        {showCloseButton && <ModalCloseButton />}
        <ModalHeaderStyled fontSize={Size.XL} $isCentered={isHeaderCentered} $withCloseButton={showCloseButton}>{header}</ModalHeaderStyled>
        <ModalBodyStyled>{body}</ModalBodyStyled>
        <ModalFooterStyled />
      </ModalContentStyled>
    </ChakraModal>
  );
}

const ModalContentStyled = styled(ModalContent)<{
  $colorMode: ColorMode;
  $width: string | undefined;
  $height: string | undefined
}>`
  padding: 6px;
  background-color: ${({ $colorMode }) => theme.colors[$colorMode].bgColor} !important;
  border: ${({ $colorMode }) => borderStyles($colorMode)};
  border-radius: ${theme.stylesToDelete.borderRadius} !important;
  max-width: 90% !important;
  min-height: fit-content;
  max-height: 90vh;
  width: ${({ $width }) => $width || 'fit-content'} !important;
  height: ${({ $height }) => $height || 'fit-content'} !important;
  ${nonHighlightableTap};
  ${nonSelectableText};
  
  ${mediaBreakpointUp(Breakpoint.TABLET)} {
    min-width: 450px;
  }
`;

const ModalHeaderStyled = styled(ModalHeader)<{ $isCentered: boolean; $withCloseButton: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: ${({ $isCentered }) => ($isCentered ? 'center' : 'space-between')};
  margin-right: ${({ $isCentered }) => ($isCentered ? '0' : '30px')};
  align-items: ${({ $isCentered, $withCloseButton }) => (($isCentered && !$withCloseButton) ? 'center' : 'baseline')};
  text-align: ${({ $isCentered, $withCloseButton }) => ($isCentered && !$withCloseButton && 'center')};
  padding: 8px 12px !important;

  ${mediaBreakpointUp(Breakpoint.TABLET)} {
    flex-direction: row;
    padding: 16px 24px !important;
  }
`;

const ModalBodyStyled = styled(ModalBody)`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 8px 12px !important;
  overflow-y: auto;
  ${hiddenScrollbar};

  ${mediaBreakpointUp(Breakpoint.TABLET)} {
    padding: 8px 24px !important;
  }
`;

const ModalFooterStyled = styled(ModalFooter)`
  padding: 4px 12px !important;

  ${mediaBreakpointUp(Breakpoint.TABLET)} {
    padding: 8px 24px !important;
  }
`;
