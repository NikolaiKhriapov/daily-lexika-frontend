import React from 'react';
import styled from 'styled-components';
import { ColorMode, useColorMode } from '@chakra-ui/react';
import { Breakpoint } from '@utils/constants';
import { borderStyles, mediaBreakpointUp } from '@utils/functions';
import { theme } from '@utils/theme';

type Props = {
  children: React.ReactNode;
};

export default function AppContent(props: Props) {
  const { children } = props;

  const { colorMode } = useColorMode();

  return (
    <Container $colorMode={colorMode}>
      <InnerContainer $colorMode={colorMode}>
        {children}
      </InnerContainer>
    </Container>
  );
}

const Container = styled.div<{ $colorMode: ColorMode }>`
  display: flex;
  justify-content: center;
  min-height: calc(100vh - 140px);
  overflow-x: hidden;

  ${mediaBreakpointUp(Breakpoint.DESKTOP)} {
    width: 100%;
    max-width: 1200px;
    min-height: fit-content;
    height: fit-content;
    overflow-x: hidden;

    background-color: ${({ $colorMode }) => theme.colors[$colorMode].background2};
    border: ${({ $colorMode }) => borderStyles($colorMode)};
    border-color: ${({ $colorMode }) => theme.colors[$colorMode].borderColorMain};
    border-radius: ${theme.stylesToDelete.borderRadius};
    box-shadow: ${({ $colorMode }) => theme.stylesToDelete[$colorMode].boxShadow};
  }
`;

const InnerContainer = styled.div<{ $colorMode: ColorMode }>`
  padding: 40px;
  display: flex;
  justify-content: center;
  margin-top: 50px;
  width: 100vw;

  ${mediaBreakpointUp(Breakpoint.TABLET)} {
    padding: 50px;
    margin-top: 70px;
  }

  ${mediaBreakpointUp(Breakpoint.DESKTOP)} {
    width: 100%;
    max-width: 1400px;
    height: fit-content;
    padding: 50px;
    margin: 0;
  }
`;
