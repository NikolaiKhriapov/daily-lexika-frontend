import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { ImDownload } from 'react-icons/im';
import Image from 'next/image';
import styled from 'styled-components';
import { ColorMode, useColorMode, useDisclosure } from '@chakra-ui/react';
import { AppInstallationContext } from '@context/app/AppInstallationContext';
import { ButtonType, FontWeight, Size } from '@utils/constants';
import { theme } from '@utils/theme';
import Button from '@components/ui-common/basic/Button';
import Text from '@components/ui-common/basic/Text';
import Modal from '@components/ui-common/complex/Modal';
import IosShareIcon from '@components/ui-common/icons/app-install/ios-share-icon.png';
import PwaBadge from '@components/ui-common/icons/app-install/pwa-badge.png';

export default function PwaInstallAppleComponent() {
  const { colorMode } = useColorMode();
  const { t } = useTranslation();
  const { isIosOrMacOs, isStandalone } = useContext(AppInstallationContext);
  const { isOpen: isOpenModal, onOpen: onOpenModal, onClose: onCloseModal } = useDisclosure();

  if (!isIosOrMacOs || isStandalone) return <></>;

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
        width='490px'
        isOpen={isOpenModal}
        onClose={onCloseModal}
        header={(
          <ButtonTextContainer $colorMode={colorMode}>
            <ImDownload fontSize={20} />
            <Text>{t('AppInstallComponent.header')}</Text>
          </ButtonTextContainer>
        )}
        body={(
          <ContentContainer>
            <LineContainer>
              <Text fontWeight={FontWeight.MEDIUM}>{t('AppInstallComponent.message')}</Text>
            </LineContainer>
            <LineContainer>
              <Text fontWeight={FontWeight.MEDIUM}>{t('AppInstallComponent.stepOne')}</Text>
              <BgContainer $colorMode={colorMode}>
                <Image src={IosShareIcon} width={20} height={20} alt="ios-share-icon" />
              </BgContainer>
            </LineContainer>
            <LineContainer>
              <Text fontWeight={FontWeight.MEDIUM}>{t('AppInstallComponent.stepTwo.textOne')}</Text>
              <BgContainer $colorMode={colorMode}>
                <Text fontWeight={FontWeight.SEMIBOLD}>{t('AppInstallComponent.stepTwo.buttonOne')}</Text>
              </BgContainer>
            </LineContainer>
            <LineContainer>
              <Text fontWeight={FontWeight.MEDIUM}>{t('AppInstallComponent.stepTwo.textTwo')}</Text>
              <BgContainer $colorMode={colorMode}>
                <Text fontWeight={FontWeight.SEMIBOLD}>{t('AppInstallComponent.stepTwo.buttonTwo')}</Text>
              </BgContainer>
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
