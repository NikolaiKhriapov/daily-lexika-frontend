import React, { useContext } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { ColorMode, useColorMode } from '@chakra-ui/react';
import { AppInstallationContext } from '@library/shared/context';
import { PwaBadge } from '@library/shared/icons';
import { theme } from '@library/shared/utils';

import { Button, ButtonType } from '../../basic/Button';

export function PwaInstallAndroidComponent() {
  const { colorMode } = useColorMode();
  const { deferredPrompt, isPwaInstallable, setPwaInstallable, isStandalone } = useContext(AppInstallationContext);

  if (!isPwaInstallable || isStandalone) return <></>;

  const handleInstallClick = () => {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then(() => setPwaInstallable(false));
  };

  return (
    <ButtonStyled
      buttonText={(
        <ButtonTextContainer $colorMode={colorMode}>
          <Image src={PwaBadge} width={165} alt="pwa-badge" />
        </ButtonTextContainer>
      )}
      buttonType={ButtonType.BUTTON}
      onClick={handleInstallClick}
      $colorMode={colorMode}
    />
  );
}

const ButtonStyled = styled(Button)<{ $colorMode: ColorMode }>`
  width: fit-content !important;
  height: fit-content !important;
  padding: 0 !important;
  border: none !important;
  background-color: ${({ $colorMode }) => theme.colors[$colorMode].background2} !important;
`;

const ButtonTextContainer = styled.div<{ $colorMode: ColorMode }>`
  display: flex;
  flex-direction: row;
  gap: 18px;
`;
