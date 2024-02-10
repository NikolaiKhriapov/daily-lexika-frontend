import React from 'react';
import styled from 'styled-components';
import { Text as ChakraText, TextProps } from '@chakra-ui/react';
import { Size } from '@utils/constants';

interface Props extends TextProps {
  size?: Size | { base: Size, sm: Size, xl: Size } | { base: string, md: string, xl: string };
  isCentered?: boolean;
}

export default function Text(props: Props) {
  const { children, size = Size.MD, isCentered = false, ...rest } = props;

  return (
    <ChakraTextStyled fontSize={size} $isCentered={isCentered} {...rest}>
      {children}
    </ChakraTextStyled>
  );
}

const ChakraTextStyled = styled(ChakraText)<{ $isCentered: boolean }>`
  text-align: ${({ $isCentered }) => $isCentered && 'center'};
`;
