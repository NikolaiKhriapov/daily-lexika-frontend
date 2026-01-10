import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { FaBookOpen, FaLayerGroup, FaUsers } from 'react-icons/fa6';
import { GoHistory } from 'react-icons/go';
import Link from 'next/link';
import styled from 'styled-components';
import { ColorMode, useColorMode } from '@chakra-ui/react';
import { Page } from '@admin/utils/Pages';
import { AppInstallationContext } from '@library/shared/context';
import { AppInstallComponent, Text } from '@library/shared/ui';
import {
  borderStyles,
  Breakpoint,
  FontWeight,
  mediaBreakpointUp,
  nonHighlightableTap,
  Size,
  theme,
} from '@library/shared/utils';

type Props = {
  page?: Page;
};

export default function AppSidebar(props: Props) {
  const { page } = props;

  const { colorMode } = useColorMode();
  const { t } = useTranslation();
  const { isStandalone } = useContext(AppInstallationContext);

  const sidebarMainDailyLexikaItems = [
    { name: t('AppSidebar.Users'), route: Page.USERS, icon: FaUsers, selected: page === Page.USERS },
    { name: t('AppSidebar.WordData'), route: Page.WORD_DATA, icon: FaBookOpen, selected: page === Page.WORD_DATA },
    { name: t('AppSidebar.WordPacks'), route: Page.WORD_PACKS, icon: FaLayerGroup, selected: page === Page.WORD_PACKS },
    { name: t('AppSidebar.Logs'), route: Page.LOGS, icon: GoHistory, selected: page === Page.LOGS },
  ];

  return (
    <Container>

      <SidebarMainMobile $colorMode={colorMode}>
        {sidebarMainDailyLexikaItems.map((item) => (
          <Item key={item.name} href={item.route} $colorMode={colorMode} $selected={item.selected}>
            <Icon as={item.icon} color={item.selected ? theme.colors.mainBlue : theme.colors[colorMode].buttonColor} />
            <Text size={Size.XS} display={{ base: 'unset', xl: 'none' }} color={item.selected && theme.colors.mainBlue}>{item.name}</Text>
            <Text size={Size.MD} display={{ base: 'none', xl: 'unset' }} color={item.selected && theme.colors.mainBlue}>{item.name}</Text>
          </Item>
        ))}
      </SidebarMainMobile>

      <SidebarMainTabletAndDesktop $colorMode={colorMode}>
        <Text size={Size.LG} fontWeight={FontWeight.SEMIBOLD} opacity='50%' isCentered>Daily Lexika</Text>
        <br />
        {sidebarMainDailyLexikaItems.map((item) => (
          <Item key={item.name} href={item.route} $colorMode={colorMode} $selected={item.selected}>
            <Icon as={item.icon} color={item.selected ? theme.colors.mainBlue : theme.colors[colorMode].buttonColor} />
            <Text size={Size.XS} display={{ base: 'unset', xl: 'none' }} color={item.selected && theme.colors.mainBlue}>{item.name}</Text>
            <Text size={Size.MD} display={{ base: 'none', xl: 'unset' }} color={item.selected && theme.colors.mainBlue}>{item.name}</Text>
          </Item>
        ))}
      </SidebarMainTabletAndDesktop>

       {!isStandalone && <ContainerDesktop><AppInstallComponent withPwa /></ContainerDesktop>}

    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;

  ${mediaBreakpointUp(Breakpoint.DESKTOP)} {
    position: sticky;
    top: 100px;
    height: fit-content;
    width: 225px;
    min-width: 225px;
  }
`;

const SidebarMainMobile = styled.div<{ $colorMode: ColorMode }>`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 70px;
  padding-left: 10px;
  padding-right: 10px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  background-color: ${({ $colorMode }) => theme.colors[$colorMode].background2};
  box-shadow: ${({ $colorMode }) => theme.stylesToDelete[$colorMode].boxShadow};
  z-index: 1000;

  ${mediaBreakpointUp(Breakpoint.TABLET)} {
    display: none;
  }
`;

const SidebarMainTabletAndDesktop = styled.div<{ $colorMode: ColorMode }>`
  display: none;

  ${mediaBreakpointUp(Breakpoint.TABLET)} {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 70px;
    padding-left: 10px;
    padding-right: 10px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    background-color: ${({ $colorMode }) => theme.colors[$colorMode].background2};
    box-shadow: ${({ $colorMode }) => theme.stylesToDelete[$colorMode].boxShadow};
    z-index: 1000;
  }

  ${mediaBreakpointUp(Breakpoint.DESKTOP)} {
    padding: 30px 20px;
    position: inherit;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: normal;
    justify-content: normal;
    border: ${({ $colorMode }) => borderStyles($colorMode)};
    border-color: ${({ $colorMode }) => theme.colors[$colorMode].borderColorMain};
    border-radius: ${theme.stylesToDelete.borderRadius};
  }
`;

const Item = styled(Link)<{ $colorMode: ColorMode; $selected: boolean }>`
  display: flex;
  position: relative;
  flex-direction: column;
  gap: 5px;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  ${nonHighlightableTap};

  ${mediaBreakpointUp(Breakpoint.TABLET)} {
    gap: 10px;
  }

  ${mediaBreakpointUp(Breakpoint.DESKTOP)} {
    width: 100%;
    padding: 16px;
    flex-direction: row;
    justify-content: left;
    border-radius: ${theme.stylesToDelete.borderRadius};
    background-color: ${({ $colorMode, $selected }) => $selected && theme.colors[$colorMode].selectedItemBg};

    &:hover {
      background-color: ${({ $colorMode }) => theme.colors[$colorMode].bgColor};
      border: ${({ $colorMode }) => borderStyles($colorMode)};
      box-shadow: ${({ $colorMode }) => theme.stylesToDelete[$colorMode].boxShadow};
    }
  }
`;

const Icon = styled.div`
  font-size: 25px;

  ${mediaBreakpointUp(Breakpoint.DESKTOP)} {
    font-size: 20px;
  }
`;

const ContainerDesktop = styled.div`
  display: none;

  ${mediaBreakpointUp(Breakpoint.DESKTOP)} {
    display: block;
  }
`;
