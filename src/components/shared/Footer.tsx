import styled from 'styled-components';
import { ColorMode, useColorMode } from '@chakra-ui/react';
import { AppInfo, Breakpoint, Size } from '@utils/constants';
import { mediaBreakpointUp } from '@utils/functions';
import { theme } from '@utils/theme';
import Link from '@components/common/basic/Link';
import Text from '@components/common/basic/Text';

type Props = {
  email: boolean;
  appVersion: boolean;
  forDesktopOnly?: boolean;
};

Footer.defaultProps = {
  forDesktopOnly: true,
};

export default function Footer(props: Props) {
  const { email, appVersion, forDesktopOnly = true } = props;

  const { colorMode } = useColorMode();

  return (
    <Container $colorMode={colorMode} $forDesktopOnly={forDesktopOnly}>
      {email && (
        <Text size={Size.SM} isCentered>
          Support: <Link href={`mailto:${AppInfo.EMAIL}`} fontSize={Size.SM}>{AppInfo.EMAIL}</Link>
        </Text>
      )}
      {appVersion && (
        <Text size={Size.SM} isCentered>App version: {AppInfo.APP_VERSION}</Text>
      )}
    </Container>
  );
}

const Container = styled.div<{ $colorMode: ColorMode, $forDesktopOnly: boolean }>`
  display: ${({ $forDesktopOnly }) => ($forDesktopOnly ? 'none' : '')};
  bottom: ${({ $forDesktopOnly }) => ($forDesktopOnly ? 'none' : '0')};
  width: ${({ $forDesktopOnly }) => ($forDesktopOnly ? 'none' : '100%')};
  height: ${({ $forDesktopOnly }) => ($forDesktopOnly ? 'none' : '70px')};
  display: ${({ $forDesktopOnly }) => ($forDesktopOnly ? 'none' : 'flex')};
  flex-direction: ${({ $forDesktopOnly }) => ($forDesktopOnly ? 'none' : 'column')};
  align-items: ${({ $forDesktopOnly }) => ($forDesktopOnly ? 'none' : 'center')};
  justify-content: ${({ $forDesktopOnly }) => ($forDesktopOnly ? 'none' : 'center')};
  background-color: ${({ $forDesktopOnly, $colorMode }) => ($forDesktopOnly ? 'none' : `${theme.colors[$colorMode].background}`)};
    
  ${mediaBreakpointUp(Breakpoint.DESKTOP)} {
    bottom: 0;
    width: 100%;
    height: 70px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: ${({ $colorMode }) => theme.colors[$colorMode].background};
    z-index: 1000;
  }
`;
