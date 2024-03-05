import React, { useContext } from 'react';
import { IoStatsChart } from 'react-icons/io5';
import { LuCalendarCheck } from 'react-icons/lu';
import { TbCards } from 'react-icons/tb';
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
    { name: 'Daily Reviews', route: Page.REVIEWS, icon: LuCalendarCheck },
    { name: 'Word Packs', route: Page.WORD_PACKS, icon: TbCards },
    { name: 'Statistics', route: Page.STATISTICS, icon: IoStatsChart },
  ];

  return (
    <Container>
      <SidebarMain $colorMode={colorMode}>
        {sidebarMainItems.map((item) => (
          <Item key={item.name} href={item.route} $colorMode={colorMode}>
            <Icon as={item.icon} />
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
  z-index: 1000;

  ${mediaBreakpointUp(Breakpoint.DESKTOP)} {
    padding: 30px 20px;
    position: sticky;
    top: 100px;
    width: 220px;
    height: fit-content;
    display: flex;
    flex-direction: column;
    align-items: normal;
    justify-content: normal;
    border: ${({ $colorMode }) => borderStyles($colorMode)};
    border-color: ${({ $colorMode }) => theme.colors[$colorMode].borderColorMain};
    border-radius: ${theme.stylesToDelete.borderRadius};
    box-shadow: ${theme.stylesToDelete.boxShadow};
  }
`;

const SidebarExtra = styled(SidebarMain)`
  display: none;

  ${mediaBreakpointUp(Breakpoint.DESKTOP)} {
    display: unset;
  }
`;

const Item = styled(Link)<{ $colorMode: ColorMode }>`
  display: flex;
  flex-direction: row;
  gap: 20px;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  ${nonHighlightableTap};

  ${mediaBreakpointUp(Breakpoint.DESKTOP)} {
    width: 180px;
    padding: 16px;
    justify-content: left;
    border-radius: ${theme.stylesToDelete.borderRadius};

    &:hover {
      background-color: ${({ $colorMode }) => theme.colors[$colorMode].bgColor};
      border: ${({ $colorMode }) => borderStyles($colorMode)};
      box-shadow: ${theme.stylesToDelete.boxShadow};
    }
  }
`;

const Icon = styled.div`
  font-size: 25px;

  ${mediaBreakpointUp(Breakpoint.DESKTOP)} {
    font-size: 20px;
  }
`;
