import React from 'react';
import styled from 'styled-components';
import { mediaBreakpointUp } from '../../../src/utils/functions';
import { Breakpoint } from '../../../src/utils/constants';

export default function BadgeStreakCount() {
  return (
    <Component />
  );
}

const Component = styled.div`
  background-color: darkseagreen;
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
