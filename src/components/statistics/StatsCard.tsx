import styled from 'styled-components';
import { ColorMode, useColorMode } from '@chakra-ui/react';
import { FontWeight, Size } from '@utils/constants';
import { borderStyles } from '@utils/functions';
import { theme } from '@utils/theme';
import Text from '@components/common/basic/Text';

type Props = {
  icon: any;
  stat?: number;
  title: string;
  isClickable?: boolean;
  onOpen?: any;
};

export default function StatsCard(props: Props) {
  const { icon, stat, title, isClickable = false, onOpen } = props;

  const { colorMode } = useColorMode();

  return (
    <Container $colorMode={colorMode} $isClickable={isClickable} onClick={onOpen}>
      <Icon>{icon}</Icon>
      <Stats>
        <Text size={Size.XXL}>{stat}</Text>
        <Text size={Size.SM} fontWeight={FontWeight.SEMIBOLD}>{title}</Text>
      </Stats>
    </Container>
  );
}

StatsCard.defaultProps = {
  stat: '–––',
  isClickable: false,
  onOpen: null,
};

const Container = styled.div<{ $colorMode: ColorMode; $isClickable: boolean }>`
  width: 220px;
  height: 100px;
  padding: 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: left;
  gap: 15px;
  background-color: ${({ $colorMode }) => theme.colors[$colorMode].bgColor};
  border: ${({ $colorMode }) => borderStyles($colorMode)};
  border-radius: ${theme.stylesToDelete.borderRadius};
  box-shadow: ${theme.stylesToDelete.boxShadow};
  cursor: ${({ $isClickable }) => $isClickable && 'pointer'};
`;

const Icon = styled.div`
  display: flex;
  align-content: center;
  justify-content: center;
`;

const Stats = styled.div`
  display: flex;
  flex-direction: column;
`;
