import React from 'react';
import { useTranslation } from 'react-i18next';
import { ImDownload } from 'react-icons/im';
import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';
import { ColorMode, Menu, MenuButton, useColorMode } from '@chakra-ui/react';
import { AppStoreBadge, GooglePlayBadge } from '@library/shared/icons';
import { borderStyles, Breakpoint, mediaBreakpointUp, theme } from '@library/shared/utils';

import { MenuList } from '../../basic/MenuList';
import { Text } from '../../basic/Text';
import { ComingSoon, ComingSoonType } from '../ComingSoon';
import { PwaInstallComponent } from './PwaInstallComponent';

type Props = {
  withPwa?: boolean;
  withGooglePlay?: boolean;
  linkGooglePlay?: string;
  withAppStore?: boolean;
  linkAppStore?: string;
}

export function AppInstallComponent(props: Props) {
  const {
    withPwa = false,
    withGooglePlay = false,
    linkGooglePlay = '',
    withAppStore = false,
    linkAppStore = '',
  } = props;

  const { colorMode } = useColorMode();
  const { t } = useTranslation();

  return (
    <Container>
      <Menu>
        <MenuButton>
          <ContainerButton $colorMode={colorMode}>
            <ImDownload fontSize={20} />
            <Text display={{ base: 'none', md: 'unset' }}>{t('AppInstallComponent.buttonText')}</Text>
          </ContainerButton>
        </MenuButton>
        <MenuListStyled $colorMode={colorMode}>
          {withPwa && (
            <InstallOptionLink href='' $colorMode={colorMode}>
              <PwaInstallComponent />
            </InstallOptionLink>
          )}
          {withGooglePlay && (
            <InstallOptionLink $colorMode={colorMode} href={linkGooglePlay} target="_blank">
              <Image src={GooglePlayBadge} width={165} alt="play-store-badge" />
              {!linkGooglePlay && <ContainerComingSoon><ComingSoon type={ComingSoonType.BADGE} /></ContainerComingSoon>}
            </InstallOptionLink>
          )}
          {withAppStore && (
            <InstallOptionLink $colorMode={colorMode} href={linkAppStore}>
              <ContainerUnavailable><Image src={AppStoreBadge} width={165} alt="app-store-badge" /></ContainerUnavailable>
              {!linkAppStore && <ContainerComingSoon><ComingSoon type={ComingSoonType.BADGE} /></ContainerComingSoon>}
            </InstallOptionLink>
          )}
        </MenuListStyled>
      </Menu>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ContainerButton = styled.div<{ $colorMode: ColorMode }>`
  width: 48px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 0;
  gap: 12px;

  ${mediaBreakpointUp(Breakpoint.TABLET)} {
    width: auto;
    padding: 20px;
    box-shadow: ${({ $colorMode }) => theme.stylesToDelete[$colorMode].boxShadow};
    border: ${({ $colorMode }) => borderStyles($colorMode)};
    border-color: ${({ $colorMode }) => theme.colors[$colorMode].borderColorMain};
    border-radius: ${theme.stylesToDelete.borderRadius};
  }

  ${mediaBreakpointUp(Breakpoint.DESKTOP)} {
    height: 60px;
    background-color: ${({ $colorMode }) => theme.colors[$colorMode].background2};

    &:hover {
      background-color: ${({ $colorMode }) => theme.colors[$colorMode].bgColor} !important;
    }
  }
`;

const MenuListStyled = styled(MenuList)<{ $colorMode: ColorMode }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: fit-content;
  height: 100%;
  padding: 20px 20px !important;
  border: ${({ $colorMode }) => borderStyles($colorMode)};
  border-radius: ${theme.stylesToDelete.borderRadius} !important;
  box-shadow: ${({ $colorMode }) => theme.stylesToDelete[$colorMode].boxShadow} !important;
  z-index: 1000;

  ${mediaBreakpointUp(Breakpoint.DESKTOP)} {
    height: 100%;
    width: 225px;
    margin: 0;
    background-color: ${({ $colorMode }) => theme.colors[$colorMode].background2} !important;
  }
`;

const InstallOptionLink = styled(Link)<{ $colorMode: ColorMode }>`
  display: flex;
  position: relative;
  padding: 8px;
  justify-content: center;
  border-radius: ${theme.stylesToDelete.borderRadius};

  &:hover {
    background-color: ${({ $colorMode }) => theme.colors[$colorMode].bgColor};
    border: ${({ $colorMode }) => borderStyles($colorMode)};
    box-shadow: ${({ $colorMode }) => theme.stylesToDelete[$colorMode].boxShadow};
  }
`;

const ContainerUnavailable = styled.div`
  opacity: 0.5;
`;

const ContainerComingSoon = styled.div`
  position: absolute;
  top: 5%;
  right: 2%;
`;
