import React from 'react';
import styled from 'styled-components';
import { Breakpoint, mediaBreakpointUp } from '@library/shared/utils';

type Props = {
  totalStreak: number;
};

export function BadgeStreakCount(props: Props) {
  const { totalStreak } = props;

  const noOfGreenDots = totalStreak;
  const noOfGrayDots = 5 - totalStreak;

  return (
    <>
      {Array.from({ length: noOfGreenDots }).map((_, index) => (
        <ColoredDot key={index} $color="darkseagreen" />
      ))}
      {Array.from({ length: noOfGrayDots }).map((_, index) => (
        <ColoredDot key={index} $color="gray" />
      ))}
    </>
  );
}

const ColoredDot = styled.div<{ $color: string }>`
  background-color: ${({ $color }) => $color};
  border-radius: 50%;
  width: 6px;
  height: 6px;
  margin-left: 2px;

  ${mediaBreakpointUp(Breakpoint.TABLET)} {
    width: 8px;
    height: 8px;
    margin-left: 3px;
  }
`;
