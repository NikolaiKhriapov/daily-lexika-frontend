import React, { useContext } from 'react';
import { ImDownload } from 'react-icons/im';
import Image from 'next/image';
import styled from 'styled-components';
import { ColorMode, useColorMode, useDisclosure } from '@chakra-ui/react';
import { PwaContext } from '@context/app/PwaContext';
import { ButtonType, FontWeight, Size } from '@utils/constants';
import { theme } from '@utils/theme';
import Button from '@components/ui-common/basic/Button';
import Text from '@components/ui-common/basic/Text';
import Modal from '@components/ui-common/complex/Modal';
import IosShareIcon from '@components/ui-common/icons/ios-share-icon.png';
import PwaBadge from '@components/ui-common/icons/pwa-badge.png';

export default function PwaInstallAppleComponent() {
  const { colorMode } = useColorMode();
  const { isIosOrMacOs, isStandalone } = useContext(PwaContext);
  const { isOpen: isOpenModal, onOpen: onOpenModal, onClose: onCloseModal } = useDisclosure();

  if (!isIosOrMacOs || isStandalone) return null;

  return (
    <>
      <ButtonStyled
        buttonText={(
          <ButtonTextContainer $colorMode={colorMode}>
            <Image src={PwaBadge} width={165} alt="pwa-badge" />
          </ButtonTextContainer>
        )}
        buttonType={ButtonType.BUTTON}
        onClick={onOpenModal}
        $colorMode={colorMode}
      />
      <Modal
        size={Size.MD}
        width='450px'
        isOpen={isOpenModal}
        onClose={onCloseModal}
        header={(
          <ButtonTextContainer $colorMode={colorMode}>
            <ImDownload fontSize={20} />
            <Text>Install app</Text>
          </ButtonTextContainer>
        )}
        body={(
          <ContentContainer>
            <LineContainer>
              <Text fontWeight={FontWeight.MEDIUM}>{'Install the app on your device. It\'s the same as downloading from the store! '}</Text>
            </LineContainer>
            <LineContainer>
              <Text fontWeight={FontWeight.MEDIUM}>1. Tap on</Text>
              <BgContainer $colorMode={colorMode}><Image src={IosShareIcon} width={20} height={20} alt="ios-share-icon" /></BgContainer>
            </LineContainer>
            <LineContainer>
              <Text fontWeight={FontWeight.MEDIUM}>2. Select</Text>
              <BgContainer $colorMode={colorMode}><Text fontWeight={FontWeight.SEMIBOLD}>Add to Home Screen</Text></BgContainer>
            </LineContainer>
            <LineContainer>
              <Text fontWeight={FontWeight.MEDIUM}>or</Text>
              <BgContainer $colorMode={colorMode}><Text fontWeight={FontWeight.SEMIBOLD}>Add to Dock</Text></BgContainer>
            </LineContainer>
          </ContentContainer>
        )}
      />
    </>
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

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const LineContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

const BgContainer = styled.div<{ $colorMode: ColorMode }>`
  padding: 5px 8px;
  background-color: ${({ $colorMode }) => theme.colors[$colorMode].hoverBgColor};
  border-radius: 7px;
`;
