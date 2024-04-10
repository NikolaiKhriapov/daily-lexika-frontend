import React from 'react';
import styled from 'styled-components';
import { Status, WordDto } from '@utils/types';
import StatusBadge from '@components/common/basic/StatusBadge';
import BadgeStreakCount from '@components/common/complex/BadgeStreakCount';

type Props = {
  word: WordDto;
};

export default function BadgeOrStreakCount(props: Props) {
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
