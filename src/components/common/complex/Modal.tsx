import React from 'react';
import styled from 'styled-components';
import {
  ColorMode,
  Modal as ChakraModal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay, ModalProps,
  useColorMode,
} from '@chakra-ui/react';
import { Breakpoint, Size } from '@utils/constants';
import { borderStyles, hiddenScrollbar, mediaBreakpointUp, nonHighlightableTap } from '@utils/functions';
import { theme } from '@utils/theme';

interface Props extends Omit<ModalProps, 'children'> {
  header: React.ReactNode;
  body: React.ReactNode;
  width?: string;
  height?: string;
}

Modal.defaultProps = {
  width: undefined,
  height: undefined,
};

export default function Modal({ header, body, width, height, ...rest }: Props) {
  const { colorMode } = useColorMode();

  return (
    <ChakraModal isCentered {...rest} size={Size.XXXL}>
      <ModalOverlay />
      <ModalContentStyled $colorMode={colorMode} $width={width} $height={height}>
        <ModalCloseButton />
        <ModalHeaderStyled fontSize={Size.XL}>{header}</ModalHeaderStyled>
        <ModalBodyStyled>{body}</ModalBodyStyled>
        <ModalFooterStyled />
      </ModalContentStyled>
    </ChakraModal>
  );
}

const ModalContentStyled = styled(ModalContent)<{ $colorMode: ColorMode, $width: string | undefined, $height: string | undefined }>`
  padding: 6px;
  background-color: ${({ $colorMode }) => theme.colors[$colorMode].bgColor} !important;
  border: ${({ $colorMode }) => borderStyles($colorMode)};
  border-radius: ${theme.stylesToDelete.borderRadius};
  min-width: 90%;
  max-width: 90% !important;
  min-height: fit-content;
  max-height: 90vh;
  width: ${({ $width }) => $width || 'fit-content'} !important;
  height: ${({ $height }) => $height || 'fit-content'} !important;
  overflow-y: auto;
  ${hiddenScrollbar};
  ${nonHighlightableTap};
  
  ${mediaBreakpointUp(Breakpoint.TABLET)} {
    min-width: 450px;
  }
`;

const ModalHeaderStyled = styled(ModalHeader)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: baseline;
  margin-right: 30px;
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
