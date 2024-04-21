import React from 'react';
import styled from 'styled-components';
import { ColorMode, useColorMode } from '@chakra-ui/react';
import { Breakpoint } from '@utils/constants';
import { mediaBreakpointUp } from '@utils/functions';
import { theme } from '@utils/theme';
import ColorModeSwitchComponent from '@components/app/navbar/app/ColorModeSwitchComponent';
import NotificationsComponent from '@components/app/navbar/app/NotificationsComponent';
import ProfileComponent from '@components/app/navbar/app/ProfileComponent';
import PwaInstallComponent from '@components/app/navbar/app/PwaInstallComponent';
import PwaInstallIosComponent from '@components/app/navbar/app/PwaInstallIosComponent';

export default function AppNavbar() {
  const { colorMode } = useColorMode();

  return (
    <Container $colorMode={colorMode}>
      <SectionsContainer>
        <Section>
          <MobileAndTabletOnlyContainer>
            <PwaInstallComponent />
            <PwaInstallIosComponent />
          </MobileAndTabletOnlyContainer>
        </Section>
        <Section>
          <NotificationsComponent />
          <ColorModeSwitchComponent />
          <ProfileComponent />
        </Section>
      </SectionsContainer>
    </Container>
  );
}

const Container = styled.div<{ $colorMode: ColorMode }>`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50px;
  background-color: ${({ $colorMode }) => theme.colors[$colorMode].background2};
  z-index: 1000;
  box-shadow: ${({ $colorMode }) => theme.stylesToDelete[$colorMode].boxShadow};

  ${mediaBreakpointUp(Breakpoint.TABLET)} {
    height: 70px;
  }
`;

const SectionsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  max-width: 1460px;
  margin: 0 10px;

  ${mediaBreakpointUp(Breakpoint.DESKTOP)} {
    margin: 0 100px;
  }
`;

const Section = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;

  ${mediaBreakpointUp(Breakpoint.TABLET)} {
    gap: 10px;
  }
`;

const MobileAndTabletOnlyContainer = styled.div`
  ${mediaBreakpointUp(Breakpoint.DESKTOP)} {
    display: none;
  }
`;
