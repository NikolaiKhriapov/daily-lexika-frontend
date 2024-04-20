import React, { useContext } from 'react';
import { ImDownload } from 'react-icons/im';
import styled from 'styled-components';
import { ColorMode, useColorMode } from '@chakra-ui/react';
import { PwaContext } from '@context/app/PwaContext';
import { Breakpoint, ButtonType } from '@utils/constants';
import { borderStyles, mediaBreakpointUp } from '@utils/functions';
import { theme } from '@utils/theme';
import Button from '@components/ui-common/basic/Button';
import Text from '@components/ui-common/basic/Text';

export default function PwaInstallComponent() {
  const { colorMode } = useColorMode();
  const { deferredPrompt, isPwaInstalled, setPwaInstalled } = useContext(PwaContext);

  const handleInstallClick = () => {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult: any) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
        setPwaInstalled(false);
      } else {
        console.log('User dismissed the install prompt');
        setPwaInstalled(false);
      }
    });
  };

  return (
    isPwaInstalled
      ? (
        <ButtonStyled
          buttonText={(
            <>
              <ImDownload fontSize={20} />
              <Text display={{ base: 'none', md: 'unset' }}>&nbsp;&nbsp;&nbsp;Install app</Text>
            </>
          )}
          buttonType={ButtonType.BUTTON}
          onClick={handleInstallClick}
          $colorMode={colorMode}
        />
      )
      : null
  );
}

const ButtonStyled = styled(Button)<{ $colorMode: ColorMode }>`
  border: none !important;
  background-color: ${({ $colorMode }) => theme.colors[$colorMode].background2} !important;

  &:hover {
    background-color: ${({ $colorMode }) => theme.colors[$colorMode].hoverBgColor} !important;
  }

  ${mediaBreakpointUp(Breakpoint.TABLET)} {
    box-shadow: ${({ $colorMode }) => theme.stylesToDelete[$colorMode].boxShadow};
    border: ${({ $colorMode }) => borderStyles($colorMode)} !important;
  }

  ${mediaBreakpointUp(Breakpoint.DESKTOP)} {
    box-shadow: none;
    border: none !important;
    border-radius: ${theme.stylesToDelete.borderRadius} !important;
      height: 60px !important;
    width: 100%;
  }
`;
