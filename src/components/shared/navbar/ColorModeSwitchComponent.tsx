import React from 'react';
import styled from 'styled-components';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { ColorMode, useColorMode } from '@chakra-ui/react';
import { ButtonType } from '@utils/constants';
import { theme } from '@utils/theme';
import Button from '@components/common/basic/Button';

export default function ColorModeSwitchComponent() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <ButtonStyled
      buttonText={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
      buttonType={ButtonType.BUTTON}
      onClick={toggleColorMode}
      $colorMode={colorMode}
    />
  );
}

const ButtonStyled = styled(Button)<{ $colorMode: ColorMode }>`
  background-color: ${({ $colorMode }) => theme.colors[$colorMode].bgColor} !important;

  &:hover {
    background-color: ${({ $colorMode }) => theme.colors[$colorMode].hoverBgColor} !important;
  }
`;
