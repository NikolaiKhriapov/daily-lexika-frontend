import React, { useContext } from 'react';
import { IoLayersOutline, IoStatsChartOutline } from 'react-icons/io5';
import { TbCalendarCheck } from 'react-icons/tb';
import Link from 'next/link';
import styled from 'styled-components';
import { ColorMode, useColorMode } from '@chakra-ui/react';
import { PwaContext } from '@context/PwaContext';
import { Breakpoint, Page, Size } from '@utils/constants';
import { borderStyles, mediaBreakpointUp, nonHighlightableTap } from '@utils/functions';
import { theme } from '@utils/theme';
import Text from '@components/common/basic/Text';
import PwaInstallComponent from '@components/shared/navbar/PwaInstallComponent';

export default function Sidebar() {
  const { colorMode } = useColorMode();
  const { isPwaInstalled } = useContext(PwaContext);

  const sidebarMainItems = [
    { name: 'Daily Reviews', route: Page.REVIEWS, icon: TbCalendarCheck },
    { name: 'Word Packs', route: Page.WORD_PACKS, icon: IoLayersOutline },
    { name: 'Statistics', route: Page.STATISTICS, icon: IoStatsChartOutline },
  ];

  return (
    <Container>
      <SidebarMain $colorMode={colorMode}>
        {sidebarMainItems.map((item) => (
          <Item key={item.name} href={item.route} $colorMode={colorMode}>
            <Icon as={item.icon} />
            <Text size={Size.XS} display={{ base: 'unset', md: 'none' }}>{item.name}</Text>
            <Text size={Size.MD} display={{ base: 'none', md: 'unset' }}>{item.name}</Text>
          </Item>
        ))}
      </SidebarMain>
      {isPwaInstalled && (
        <SidebarExtra $colorMode={colorMode}>
          <PwaInstallComponent />
        </SidebarExtra>
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
    width: 220px;
  }
`;

const SidebarMain = styled.div<{ $colorMode: ColorMode }>`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  background-color: ${({ $colorMode }) => theme.colors[$colorMode].background2};
  box-shadow: ${({ $colorMode }) => theme.stylesToDelete[$colorMode].boxShadow};
  z-index: 1000;

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

const SidebarExtra = styled(SidebarMain)`
  display: none;

  ${mediaBreakpointUp(Breakpoint.DESKTOP)} {
    display: unset;
    padding: 0;
  }
`;

const Item = styled(Link)<{ $colorMode: ColorMode }>`
  display: flex;
  flex-direction: column;
  gap: 5px;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  ${nonHighlightableTap};

  ${mediaBreakpointUp(Breakpoint.TABLET)} {
    flex-direction: row;
    gap: 18px;
  }
    
  ${mediaBreakpointUp(Breakpoint.DESKTOP)} {
    width: 180px;
    padding: 16px;
    justify-content: left;
    border-radius: ${theme.stylesToDelete.borderRadius};

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
