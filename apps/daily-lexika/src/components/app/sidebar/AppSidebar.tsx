import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { IoLayersOutline, IoStatsChartOutline } from 'react-icons/io5';
import { TbCards, TbDeviceTabletSearch } from 'react-icons/tb';
import Link from 'next/link';
import styled from 'styled-components';
import { ColorMode, useColorMode } from '@chakra-ui/react';
import WordOfTheDayComponent from '@daily-lexika/components/app/navbar/word-of-the-day/WordOfTheDayComponent';
import { AppInfo } from '@daily-lexika/utils/constants';
import { Page } from '@daily-lexika/utils/Pages';
import { AppInstallationContext } from '@library/shared/context';
import { AppInstallComponent, ComingSoon, ComingSoonType, Text } from '@library/shared/ui';
import { borderStyles, Breakpoint, mediaBreakpointUp, nonHighlightableTap, Size, theme } from '@library/shared/utils';

type Props = {
  page?: Page;
};

export default function AppSidebar(props: Props) {
  const { page } = props;

  const { colorMode } = useColorMode();
  const { t } = useTranslation();
  const { isStandalone } = useContext(AppInstallationContext);

  const sidebarMainMobileItems = [
    { name: t('AppSidebar.Dailies.mobile'), route: Page.REVIEWS, icon: TbCards, selected: page === Page.REVIEWS || page === Page.WORD_PACKS, isReady: true },
    { name: t('AppSidebar.Search'), route: Page.SEARCH, icon: TbDeviceTabletSearch, selected: page === Page.SEARCH, isReady: true },
    { name: t('AppSidebar.Statistics'), route: Page.STATISTICS, icon: IoStatsChartOutline, selected: page === Page.STATISTICS, isReady: true },
  ];

  const sidebarMainTabletAndDesktopItems = [
    { name: t('AppSidebar.Dailies.tabletAndDesktop'), route: Page.REVIEWS, icon: TbCards, selected: page === Page.REVIEWS, isReady: true },
    { name: t('AppSidebar.WordPacks'), route: Page.WORD_PACKS, icon: IoLayersOutline, selected: page === Page.WORD_PACKS, isReady: true },
    { name: t('AppSidebar.Search'), route: Page.SEARCH, icon: TbDeviceTabletSearch, selected: page === Page.SEARCH, isReady: true },
    { name: t('AppSidebar.Statistics'), route: Page.STATISTICS, icon: IoStatsChartOutline, selected: page === Page.STATISTICS, isReady: true },
  ];

  return (
    <Container>

      <SidebarMainMobile $colorMode={colorMode}>
        {sidebarMainMobileItems.map((item) => (
          <Item key={item.name} href={item.route} $colorMode={colorMode} $selected={item.selected}>
            <Icon as={item.icon} color={item.isReady ? (item.selected ? theme.colors.mainBlue : theme.colors[colorMode].buttonColor) : 'gray'} />
            <Text size={Size.XS} display={{ base: 'unset', xl: 'none' }} color={item.isReady ? (item.selected && theme.colors.mainBlue) : 'gray'}>{item.name}</Text>
            <Text size={Size.MD} display={{ base: 'none', xl: 'unset' }} color={item.isReady ? (item.selected && theme.colors.mainBlue) : 'gray'}>{item.name}</Text>
            {!item.isReady && <ComingSoonContainer><ComingSoon type={ComingSoonType.BADGE} /></ComingSoonContainer>}
          </Item>
        ))}
      </SidebarMainMobile>

      <SidebarMainTabletAndDesktop $colorMode={colorMode}>
        {sidebarMainTabletAndDesktopItems.map((item) => (
          <Item key={item.name} href={item.route} $colorMode={colorMode} $selected={item.selected}>
            <Icon as={item.icon} color={item.isReady ? (item.selected ? theme.colors.mainBlue : theme.colors[colorMode].buttonColor) : 'gray'} />
            <Text size={Size.XS} display={{ base: 'unset', xl: 'none' }} color={item.isReady ? (item.selected && theme.colors.mainBlue) : 'gray'}>{item.name}</Text>
            <Text size={Size.MD} display={{ base: 'none', xl: 'unset' }} color={item.isReady ? (item.selected && theme.colors.mainBlue) : 'gray'}>{item.name}</Text>
            {!item.isReady && <ComingSoonContainer><ComingSoon type={ComingSoonType.BADGE} /></ComingSoonContainer>}
          </Item>
        ))}
      </SidebarMainTabletAndDesktop>

      <ContainerDesktop><WordOfTheDayComponent /></ContainerDesktop>
      {!isStandalone && (
        <ContainerDesktop>
          <AppInstallComponent
            withPwa
            withGooglePlay
            linkGooglePlay={AppInfo.LINK_GOOGLE_PLAY}
          />
        </ContainerDesktop>
      )}
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

const ComingSoonContainer = styled.div`
  position: absolute;
  top: 10%;
  right: 20%;

  ${mediaBreakpointUp(Breakpoint.TABLET)} {
    top: 20%;
    right: 15%;
  }

  ${mediaBreakpointUp(Breakpoint.DESKTOP)} {
    top: 15%;
    right: 5%;
  }
`;
