import React from 'react';
import styled from 'styled-components';
import { Breakpoint } from '@utils/constants';
import { mediaBreakpointUp } from '@utils/functions';

type Props = {
  totalStreak: number;
};

export default function BadgeStreakCount(props: Props) {
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
  width: 7px;
  height: 7px;
  margin-left: 3px;
  
  ${mediaBreakpointUp(Breakpoint.TABLET)} {
    width: 10px;
    height: 10px;
    margin-left: 5px;
  }
`;
