import React, { useContext } from 'react';
import styled from 'styled-components';
import { ColorMode, useColorMode } from '@chakra-ui/react';
import ProfileComponent from '@daily-budget/components/app/navbar/profile/ProfileComponent';
import { AppInfo } from '@daily-budget/utils/constants';
import { AppInstallationContext } from '@library/shared/context';
import { AppInstallComponent } from '@library/shared/ui';
import { Breakpoint, mediaBreakpointUp, theme } from '@library/shared/utils';

export default function AppNavbar() {
  const { colorMode } = useColorMode();
  const { isStandalone } = useContext(AppInstallationContext);

  return (
    <Container $colorMode={colorMode}>
      <SectionsContainer>
        <Section>
          {!isStandalone && (
            <ContainerMobileAndTablet>
              <AppInstallComponent
                withPwa
                withGooglePlay
                linkGooglePlay={AppInfo.LINK_GOOGLE_PLAY}
              />
            </ContainerMobileAndTablet>
          )}
        </Section>
        <Section>
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

const ContainerMobileAndTablet = styled.div`
  ${mediaBreakpointUp(Breakpoint.DESKTOP)} {
    display: none;
  }
`;
