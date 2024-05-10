import React, { useContext } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { ColorMode, useColorMode } from '@chakra-ui/react';
import { AppInstallationContext } from '@context/app/AppInstallationContext';
import { ButtonType } from '@utils/constants';
import { theme } from '@utils/theme';
import Button from '@components/ui-common/basic/Button';
import PwaBadge from '@components/ui-common/icons/app-install/pwa-badge.png';

export default function PwaInstallAndroidComponent() {
  const { colorMode } = useColorMode();
  const { deferredPrompt, isPwaInstallable, setPwaInstallable, isStandalone } = useContext(AppInstallationContext);

  if (!isPwaInstallable || isStandalone) return null;

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
