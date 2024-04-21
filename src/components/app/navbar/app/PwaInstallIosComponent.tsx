import React, { useEffect, useState } from 'react';
import { ImDownload } from 'react-icons/im';
import Image from 'next/image';
import styled from 'styled-components';
import { ColorMode, useColorMode, useDisclosure } from '@chakra-ui/react';
import { detectBrowser, detectDeviceType, detectOS } from '@chakra-ui/utils';
import { Breakpoint, ButtonType, FontWeight, Size } from '@utils/constants';
import { borderStyles, mediaBreakpointUp } from '@utils/functions';
import { theme } from '@utils/theme';
import Button from '@components/ui-common/basic/Button';
import Text from '@components/ui-common/basic/Text';
import Modal from '@components/ui-common/complex/Modal';
import IosShareIcon from '@components/ui-common/icons/ios-share-icon.png';

export default function PwaInstallIosComponent() {
  const { colorMode } = useColorMode();

  const [isIos, setIos] = useState(false);
  const [isMacOsAndSafari, setMacOsAndSafari] = useState(false);
  const [deviceType, setDeviceType] = useState<string | null>(null);
  const { isOpen: isOpenModal, onOpen: onOpenModal, onClose: onCloseModal } = useDisclosure();

  const checkIsIos = () => detectOS('iOS');
  const checkIsMacOsAndSafari = () => detectOS('Mac') && detectBrowser('WebKit');

  useEffect(() => {
    setIos(checkIsIos());
    setMacOsAndSafari(checkIsMacOsAndSafari());
    if (typeof window !== 'undefined') {
      setDeviceType(detectDeviceType(window.navigator));
    }
  }, [isIos, isMacOsAndSafari]);

  return (
    (isIos || isMacOsAndSafari) && deviceType
      ? (
        <>
          <ButtonStyled
            buttonText={(
              <>
                <ImDownload fontSize={20} />
                <Text display={{ base: 'none', md: 'unset' }}>&nbsp;&nbsp;&nbsp;Install app</Text>
              </>
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
              <ButtonTextContainer>
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
                  <BgContainer $colorMode={colorMode}>
                    <Text fontWeight={FontWeight.SEMIBOLD}>
                      {deviceType === 'desktop' && 'Add to Dock'}
                      {(deviceType === 'tablet' || deviceType === 'phone') && 'Add to Home Screen'}
                    </Text>
                  </BgContainer>
                </LineContainer>
              </ContentContainer>
            )}
          />
        </>
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

const ButtonTextContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
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
