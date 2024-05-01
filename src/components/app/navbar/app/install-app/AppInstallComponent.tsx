import React, { useContext } from 'react';
import styled from 'styled-components';
import { ColorMode, useColorMode } from '@chakra-ui/react';
import { PwaContext } from '@context/app/PwaContext';
import { Breakpoint } from '@utils/constants';
import { borderStyles, mediaBreakpointUp } from '@utils/functions';
import { theme } from '@utils/theme';
import PwaInstallComponent from '@components/app/navbar/app/install-app/PwaInstallComponent';
import PwaInstallIosComponent from '@components/app/navbar/app/install-app/PwaInstallIosComponent';

export default function AppInstallComponent() {
  const { colorMode } = useColorMode();
  const { isPwaInstallable, isIosOrMacOs, isStandalone } = useContext(PwaContext);

  return (
    !isStandalone
      ? (isPwaInstallable
        ? <Container $colorMode={colorMode}><PwaInstallComponent /></Container>
        : isIosOrMacOs
          ? <Container $colorMode={colorMode}><PwaInstallIosComponent /></Container>
          : <></>
      ) : <></>
  );
}

const Container = styled.div<{ $colorMode: ColorMode }>`
  display: none;

  ${mediaBreakpointUp(Breakpoint.DESKTOP)} {
    display: unset;
    box-shadow: ${({ $colorMode }) => theme.stylesToDelete[$colorMode].boxShadow};
    background-color: ${({ $colorMode }) => theme.colors[$colorMode].background2};
    border: ${({ $colorMode }) => borderStyles($colorMode)};
    border-color: ${({ $colorMode }) => theme.colors[$colorMode].borderColorMain};
    border-radius: ${theme.stylesToDelete.borderRadius};
    z-index: 1000;
  }
`;
