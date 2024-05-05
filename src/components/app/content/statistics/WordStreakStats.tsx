import React from 'react';
import styled from 'styled-components';
import { FontWeight, Size } from '@utils/constants';
import { WordDto } from '@utils/types';
import ProgressBar from '@components/ui-common/basic/ProgressBar';
import Skeleton from '@components/ui-common/basic/Skeleton';
import Text from '@components/ui-common/basic/Text';
import BadgeOrStreakCount from '@components/ui-common/complex/BadgeOrStreakCount';

interface Props {
  word?: WordDto | undefined;
}

export default function WordStreakStats(props: Props) {
  const { word } = props;

  if (!word) return <Skeleton height='32px' width='auto' />;

  return (
    <>
      <TopContainer>
        <Text fontSize={Size.MD} fontWeight={FontWeight.SEMIBOLD} color='green.200'>{`${word.totalStreak} / 5`}</Text>
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
