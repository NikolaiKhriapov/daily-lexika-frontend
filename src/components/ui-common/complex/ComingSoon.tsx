import React from 'react';
import styled from 'styled-components';
import { ColorMode, useColorMode } from '@chakra-ui/react';
import { Breakpoint, FontWeight, Size } from '@utils/constants';
import { borderStyles, mediaBreakpointUp } from '@utils/functions';
import { theme } from '@utils/theme';
import Text from '@components/ui-common/basic/Text';

export enum ComingSoonType {
  TEXT = 'TEXT',
  BADGE = 'BADGE',
}

interface Props {
  type: ComingSoonType;
}

export default function ComingSoon(props: Props) {
  const { type } = props;

  const { colorMode } = useColorMode();

  switch (type) {
    case ComingSoonType.TEXT:
      return <Text fontWeight={FontWeight.SEMIBOLD} isCentered opacity='50%'>Coming soon</Text>;
    case ComingSoonType.BADGE:
      return (
        <BadgeContainer $colorMode={colorMode}>
          <Text fontSize={Size.XS} isCentered opacity='50%'>Soon</Text>
        </BadgeContainer>
      );
    default:
      return <></>;
  }
}

const BadgeContainer = styled.div<{ $colorMode: ColorMode }>`
  width: min-content;
  padding: 2px 6px;
  background-color: ${({ $colorMode }) => theme.colors[$colorMode].background2};
  border: ${({ $colorMode }) => borderStyles($colorMode)};
  border-radius: ${theme.stylesToDelete.borderRadius};
  z-index: 1000;
    
  ${mediaBreakpointUp(Breakpoint.DESKTOP)} {
    padding: 3px 10px;
  }
`;
