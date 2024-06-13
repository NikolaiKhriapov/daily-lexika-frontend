import React, { useState } from 'react';
import styled from 'styled-components';
import {
  ColorMode, Drawer as ChakraDrawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, DrawerProps, useColorMode,
} from '@chakra-ui/react';
import { Breakpoint, Size } from '@utils/constants';
import {
  borderStyles, hiddenScrollbar, mediaBreakpointUp, nonHighlightableTap, nonSelectableText,
} from '@utils/functions';
import { theme } from '@utils/theme';

interface Props extends Omit<DrawerProps, 'children'> {
  header: React.ReactNode;
  body: React.ReactNode;
  width?: string;
}

export default function Drawer(props: Props) {
  const { header, body, width, onClose, isOpen, ...rest } = props;

  const { colorMode } = useColorMode();
  const [startY, setStartY] = useState<number | null>(null);
  const [translateY, setTranslateY] = useState<number>(0);
  const [closing, setClosing] = useState(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (closing) return;
    setStartY(e.touches[0].clientY);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (closing) return;
    setStartY(e.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (startY !== null && !closing) {
      const currentY = e.touches[0].clientY;
      const deltaY = currentY - startY;
      setTranslateY(deltaY > 0 ? deltaY : 0);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (startY !== null && !closing) {
      const currentY = e.clientY;
      const deltaY = currentY - startY;
      setTranslateY(deltaY > 0 ? deltaY : 0);
    }
  };

  const onCloseDrawer = () => {
    setClosing(true);
    setTranslateY(window.innerHeight);
    setTimeout(() => {
      onClose();
      setTranslateY(0);
      setClosing(false);
    }, 300);
  };

  const onStopDragging = () => {
    if (translateY > 300) {
      onCloseDrawer();
    } else {
      setTranslateY(0);
    }
    setStartY(null);
  };

  return (
    <ChakraDrawer placement='bottom' onClose={onCloseDrawer} isOpen={isOpen} {...rest}>
      <DrawerOverlay />
      <DrawerContentStyled
        $colorMode={colorMode}
        $width={width}
        translateY={translateY}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={onStopDragging}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={onStopDragging}
        closing={closing}
      >
        <DrawerHeaderStyled fontSize={Size.XL}>
          <DrawerLineContainer><DrawerLine /></DrawerLineContainer>
          {header}
        </DrawerHeaderStyled>
        <DrawerBodyStyled>{body}</DrawerBodyStyled>
      </DrawerContentStyled>
    </ChakraDrawer>
  );
}

const DrawerContentStyled = styled(DrawerContent)<{
  $colorMode: ColorMode;
  $width: string | undefined;
  translateY: number;
  closing: boolean;
}>`
  padding: 6px;
  background-color: ${({ $colorMode }) => theme.colors[$colorMode].bgColor} !important;
  border: ${({ $colorMode }) => borderStyles($colorMode)};
  border-radius: 20px 20px 0 0;
  height: 70vh;
  transform: ${({ translateY }) => translateY && `translateY(${translateY}px)`} !important;
  transition: ${({ closing, translateY }) => ((closing || translateY === 0) && 'transform 0.3s ease')} !important;
  ${nonHighlightableTap};
  ${nonSelectableText};

  ${mediaBreakpointUp(Breakpoint.TABLET)} {
    width: ${({ $width }) => $width && $width} !important;
    left: ${({ $width }) => $width && `calc(50% - ${$width}/2)`} !important;
  }
`;

const DrawerHeaderStyled = styled(DrawerHeader)`
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 4px 12px 8px 12px !important;

  ${mediaBreakpointUp(Breakpoint.TABLET)} {
    padding: 8px 24px 16px 24px !important;
  }
`;

const DrawerLineContainer = styled.div`
  display: flex;
  justify-content: center !important;
  width: 100%;
  cursor: pointer;
`;

const DrawerLine = styled.div`
  display: flex;
  height: 5px;
  width: 40%;
  border-radius: 5px;
  margin: 5px;
  background-color: white;
`;

const DrawerBodyStyled = styled(DrawerBody)`
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
