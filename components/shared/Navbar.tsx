import React from 'react';
import { ColorMode, useColorMode } from '@chakra-ui/react';
import styled from 'styled-components';
import { Breakpoint } from '../../src/utils/constants';
import { theme } from '../../src/utils/theme';
import { mediaBreakpointUp } from '../../src/utils/functions';
import NotificationsComponent from './navbar/NotificationsComponent';
import ColorModeSwitchComponent from './navbar/ColorModeSwitchComponent';
import ProfileComponent from './navbar/ProfileComponent';

export default function Navbar() {
  const { colorMode } = useColorMode();

  return (
    <Container $colorMode={colorMode}>
      <NotificationsComponent />
      <ColorModeSwitchComponent />
      <ProfileComponent />
    </Container>
  );
}

const Container = styled.div<{ $colorMode: ColorMode }>`
  position: fixed;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  height: 50px;
  gap: 5px;
  padding-right: 10px;
  background-color: ${({ $colorMode }) => theme.colors[$colorMode].bgColor};
  z-index: 1000;

  ${mediaBreakpointUp(Breakpoint.TABLET)} {
    height: 70px;
    gap: 10px;
    padding-right: 30px;
  }
`;
