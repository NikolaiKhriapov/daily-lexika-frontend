import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { ColorMode, useBreakpointValue, useColorMode } from '@chakra-ui/react';
import { borderStyles } from '@utils/functions';
import { theme } from '@utils/theme';

type Props = {
  face: ReactNode;
  back: ReactNode;
  height: string | { base: string, md: string, lg: string };
  width: string | { base: string, md: string, lg: string };
  padding: string;
  borderColor?: string;
  bgColor: string;
  isFlipped: boolean;
  setFlipped: React.Dispatch<React.SetStateAction<boolean>>;
};

Card.defaultProps = {
  borderColor: '',
};

export default function Card(props: Props) {
  const {
    face,
    back,
    height,
    width,
    padding,
    borderColor = '',
    bgColor,
    isFlipped,
    setFlipped,
  } = props;

  const { colorMode } = useColorMode();

  return (
    <Container
      $isFlipped={isFlipped}
      $colorMode={colorMode}
      $height={height}
      $width={width}
      $padding={padding}
      $borderColor={borderColor}
      $bgColor={bgColor}
      onClick={() => setFlipped(!isFlipped)}
    >
      {!isFlipped && face}
      {isFlipped && back}
    </Container>
  );
}

const Container = styled.div<{
  $colorMode: ColorMode;
  $isFlipped: boolean;
  $height: string | { base: string, md: string, lg: string };
  $width: string | { base: string, md: string, lg: string };
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
  
  background-color: ${({ $bgColor }) => $bgColor};
  cursor: pointer;

  transform: ${({ $isFlipped }) => ($isFlipped ? 'rotateY(180deg) scaleX(-1)' : 'rotateY(0deg)')};
  transition: transform 0.3s;
`;
