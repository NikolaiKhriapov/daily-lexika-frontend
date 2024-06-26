import React from 'react';
import styled from 'styled-components';
import { Status, WordDto } from '@library/daily-lexika';

import { StatusBadge } from '../basic/StatusBadge';
import { BadgeStreakCount } from './BadgeStreakCount';

type Props = {
  word: WordDto;
};

export function BadgeOrStreakCount(props: Props) {
  const { word } = props;

  const getStatusColor = (status: Status) => {
    switch (status.toString()) {
      case Status[Status.KNOWN]:
        return 'green';
      case Status[Status.NEW]:
        return 'red';
      default:
        return 'gray';
    }
  };

  return (
    <Component>
      {
        word.status.toString() === Status[Status.IN_REVIEW]
          ? <BadgeStreakCount totalStreak={word.totalStreak} />
          : <StatusBadge text={word.status} colorScheme={getStatusColor(word.status)} />
      }
    </Component>
  );
}

const Component = styled.div`
  display: flex;
  flex-direction: row;
`;
