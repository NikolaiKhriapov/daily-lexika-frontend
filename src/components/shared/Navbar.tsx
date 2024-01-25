import React from 'react';
import styled from 'styled-components';
import { ColorMode, useColorMode } from '@chakra-ui/react';
import { Breakpoint } from '@utils/constants';
import { mediaBreakpointUp } from '@utils/functions';
import { theme } from '@utils/theme';
import ColorModeSwitchComponent from '@components/shared/navbar/ColorModeSwitchComponent';
import NotificationsComponent from '@components/shared/navbar/NotificationsComponent';
import ProfileComponent from '@components/shared/navbar/ProfileComponent';

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
