import React from 'react';
import styled from 'styled-components';
import { Status, WordDTO } from '@utils/types';
import StatusBadge from '@components/common/basic/StatusBadge';
import BadgeStreakCount from '@components/common/complex/BadgeStreakCount';

type Props = {
  wordDTO: WordDTO;
};

export default function BadgeOrStreakCount(props: Props) {
  const { wordDTO } = props;

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
        wordDTO.status.toString() === Status[Status.IN_REVIEW]
          ? <BadgeStreakCount totalStreak={wordDTO.totalStreak} />
          : <StatusBadge text={wordDTO.status} colorScheme={getStatusColor(wordDTO.status)} />
      }
    </Component>
  );
}

const Component = styled.div`
  display: flex;
  flex-direction: row;
`;
