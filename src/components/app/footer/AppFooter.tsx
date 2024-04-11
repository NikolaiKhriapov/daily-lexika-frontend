import styled from 'styled-components';
import { ColorMode, useColorMode } from '@chakra-ui/react';
import { AppInfo } from '@utils/app/constants';
import { Breakpoint, Size } from '@utils/constants';
import { mediaBreakpointUp } from '@utils/functions';
import { theme } from '@utils/theme';
import Text from '@components/ui-common/basic/Text';

export default function AppFooter() {
  const { colorMode } = useColorMode();

  return (
    <Container $colorMode={colorMode}>
      <Text size={Size.SM} isCentered>App version: {AppInfo.APP_VERSION}</Text>
    </Container>
  );
}

const Container = styled.div<{ $colorMode: ColorMode }>`
  bottom: 0;
  width: 100%;
  height: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${({ $colorMode }) => theme.colors[$colorMode].background};
  margin-bottom: 70px;
  z-index: 0;

  ${mediaBreakpointUp(Breakpoint.DESKTOP)} {
    margin-bottom: 0;
    z-index: 1000;
  }
`;
