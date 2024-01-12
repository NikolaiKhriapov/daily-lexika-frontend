import { ColorMode, useColorMode } from '@chakra-ui/react';
import { IoStatsChart } from 'react-icons/io5';
import { TbCards } from 'react-icons/tb';
import { LuCalendarCheck } from 'react-icons/lu';
import styled from 'styled-components';
import Link from 'next/link';
import { Breakpoint, Page, Size } from '../../src/utils/constants';
import { borderStyles, mediaBreakpointUp } from '../../src/utils/functions';
import { theme } from '../../src/utils/theme';
import Text from '../common/basic/Text';

export default function Sidebar() {
  const { colorMode } = useColorMode();

  const sidebarItems = [
    { name: 'Daily Reviews', route: Page.REVIEWS, icon: LuCalendarCheck },
    { name: 'Word Packs', route: Page.WORD_PACKS, icon: TbCards },
    { name: 'Statistics', route: Page.STATISTICS, icon: IoStatsChart },
  ];

  return (
    <Container $colorMode={colorMode}>
      {sidebarItems.map((item) => (
        <Item key={item.name} href={item.route} $colorMode={colorMode}>
          <Icon as={item.icon} />
          <Text size={Size.MD} display={{ base: 'none', md: 'unset' }}>{item.name}</Text>
        </Item>
      ))}
    </Container>
  );
}

const Container = styled.div<{ $colorMode: ColorMode }>`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  background-color: ${({ $colorMode }) => theme.colors[$colorMode].bgColor};
  z-index: 1000;

  ${mediaBreakpointUp(Breakpoint.DESKTOP)} {
    top: 120px;
    width: 210px;
    display: flex;
    flex-direction: column;
    align-items: normal;
    justify-content: normal;
    background-color: ${({ $colorMode }) => theme.colors[$colorMode].background};
  }
`;

const Item = styled(Link)<{ $colorMode: ColorMode }>`
  display: flex;
  flex-direction: row;
  gap: 20px;
  cursor: pointer;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;

  ${mediaBreakpointUp(Breakpoint.DESKTOP)} {
    padding: 16px;
    margin: 0 20px;
    justify-content: left;
    cursor: pointer;
    border-radius: ${theme.stylesToDelete.borderRadius};

    &:hover {
      background-color: ${({ $colorMode }) => theme.colors[$colorMode].bgColor};
      border: ${({ $colorMode }) => borderStyles($colorMode)};
    }
  }
`;

const Icon = styled.div`
  font-size: 25px;

  ${mediaBreakpointUp(Breakpoint.DESKTOP)} {
    font-size: 16px;
  }
`;
