import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { ColorMode, useBreakpointValue, useColorMode } from '@chakra-ui/react';
import { borderStyles, nonHighlightableTap, nonSelectableText, theme } from '@library/shared/utils';

type Props = {
  face: ReactNode;
  back?: ReactNode;
  height: string | { base: string, sm: string, xl: string };
  width: string | { base: string, sm: string, xl: string };
  padding: string;
  borderColor?: string;
  bgColor: string;
  isFlipped?: boolean;
  setFlipped?: React.Dispatch<React.SetStateAction<boolean>>;
  setUnlocked?: any;
};

export function Card(props: Props) {
  const {
    face,
    back,
    height,
    width,
    padding,
    borderColor = '',
    bgColor,
    isFlipped = false,
    setFlipped,
    setUnlocked,
  } = props;

  const { colorMode } = useColorMode();
  const isFlippable = !!back;

  return (
    <Container
      $isFlipped={isFlippable ? isFlipped : false}
      $colorMode={colorMode}
      $height={height}
      $width={width}
      $padding={padding}
      $borderColor={borderColor}
      $bgColor={bgColor}
      onClick={() => {
        if (isFlippable && setFlipped) setFlipped(!isFlipped);
        if (setUnlocked) setUnlocked(true);
      }}
    >
      {!isFlipped && face}
      {isFlipped && back && back}
    </Container>
  );
}

const Container = styled.div<{
  $colorMode: ColorMode;
  $isFlipped: boolean;
  $height: string | { base: string, sm: string, xl: string };
  $width: string | { base: string, sm: string, xl: string };
  $padding: string;
  $borderColor: string;
  $bgColor: string;
}>`
  height: ${({ $height }) => (typeof $height === 'string' ? $height : useBreakpointValue($height))};
  width: ${({ $width }) => (typeof $width === 'string' ? $width : useBreakpointValue($width))};
  padding: ${({ $padding }) => $padding};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: ${({ $colorMode }) => borderStyles($colorMode)};
  border-color: ${({ $borderColor }) => $borderColor};
  border-radius: ${theme.stylesToDelete.borderRadius};
  box-shadow: ${({ $colorMode }) => theme.stylesToDelete[$colorMode].boxShadow};

  background-color: ${({ $bgColor }) => $bgColor};
  cursor: pointer;
  ${nonHighlightableTap};
  ${nonSelectableText};

  transform: ${({ $isFlipped }) => ($isFlipped ? 'rotateY(180deg) scaleX(-1)' : 'rotateY(0deg)')};
  transition: transform 0.3s;
`;
