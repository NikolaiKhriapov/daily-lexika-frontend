import React from 'react';
import styled from 'styled-components';
import { Heading as ChakraHeading, HeadingProps } from '@chakra-ui/react';
import { FontWeight } from '@utils/constants';

interface Props extends HeadingProps {
  isCentered?: boolean;
}

export default function Heading({ children, isCentered, ...rest }: Props) {
  return (
    <ChakraHeadingStyled fontWeight={FontWeight.MEDIUM} $isCentered={isCentered} {...rest}>
      {children}
    </ChakraHeadingStyled>
  );
}

Heading.defaultProps = {
  isCentered: false,
};

const ChakraHeadingStyled = styled(ChakraHeading)<{ $isCentered: boolean }>`
  text-align: ${({ $isCentered }) => $isCentered && 'center'};
`;
