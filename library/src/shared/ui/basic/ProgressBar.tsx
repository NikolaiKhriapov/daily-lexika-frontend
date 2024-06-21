import styled from 'styled-components';
import { ColorMode, Progress, ProgressProps, useColorMode } from '@chakra-ui/react';
import { Size, theme } from '@library/shared/utils';

export function ProgressBar({ ...rest }: ProgressProps) {
  const { colorMode } = useColorMode();

  return (
    <ProgressStyled
      $colorMode={colorMode}
      colorScheme='gray'
      size={Size.SM}
      rounded={Size.MD}
      {...rest}
    />
  );
}

const ProgressStyled = styled(Progress)<{ $colorMode: ColorMode }>`
  background-color: ${({ $colorMode }) => theme.colors[$colorMode].progressBarBgColor};

  & > div {
    transition: width 0.4s ease;
  }
`;
