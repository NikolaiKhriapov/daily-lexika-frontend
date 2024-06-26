import React from 'react';
import styled from 'styled-components';
import { Heading as ChakraHeading, HeadingProps } from '@chakra-ui/react';
import { FontWeight, theme } from '@library/shared/utils';

interface Props extends HeadingProps {
  isCentered?: boolean;
  isSingleColorMode?: boolean;
}

export function Heading(props: Props) {
  const { children, isCentered = false, isSingleColorMode = false, ...rest } = props;

  return (
    <ChakraHeadingStyled
      fontWeight={FontWeight.MEDIUM}
      $isCentered={isCentered}
      $isSingleColorMode={isSingleColorMode}
      {...rest}
    >
      {children}
    </ChakraHeadingStyled>
  );
}

const ChakraHeadingStyled = styled(ChakraHeading)<{ $isCentered: boolean; $isSingleColorMode: boolean }>`
  text-align: ${({ $isCentered }) => $isCentered && 'center'};
  color: ${({ $isSingleColorMode }) => $isSingleColorMode && theme.colors.textBlack};
`;
