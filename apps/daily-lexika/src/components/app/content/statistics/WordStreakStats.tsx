import React from 'react';
import styled from 'styled-components';
import { useColorMode } from '@chakra-ui/react';
import { BadgeOrStreakCount } from '@daily-lexika/components/ui/BadgeOrStreakCount';
import { WordDto } from '@library/daily-lexika';
import { ProgressBar, Skeleton, Text } from '@library/shared/ui';
import { FontWeight, Size } from '@library/shared/utils';

interface Props {
  word?: WordDto | undefined;
}

export default function WordStreakStats(props: Props) {
  const { word } = props;

  const { colorMode } = useColorMode();

  const greenTextColor = colorMode === 'dark' ? 'green.200' : 'green';

  if (!word) return <Skeleton height='32px' width='auto' />;

  return (
    <>
      <TopContainer>
        <Text fontSize={Size.MD} fontWeight={FontWeight.SEMIBOLD} color={greenTextColor}>{`${word.totalStreak} / 5`}</Text>
        <BadgeOrStreakCount word={word} />
      </TopContainer>
      <ProgressBar value={(word.totalStreak / 5) * 100} colorScheme='green' />
    </>
  );
}

const TopContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  height: fit-content;
`;
