import React from 'react';
import styled from 'styled-components';
import { Text as ChakraText, TextProps } from '@chakra-ui/react';
import { nonSelectableText, Size, theme } from '@library/shared/utils';

interface Props extends TextProps {
  size?: Size | { base: Size, sm: Size, xl: Size } | { base: string, md: string, xl: string };
  isCentered?: boolean;
  isSingleColorMode?: boolean;
}

export function Text(props: Props) {
  const { children, size = Size.MD, isCentered = false, isSingleColorMode = false, ...rest } = props;

  return (
    <ChakraTextStyled
      fontSize={size}
      $isCentered={isCentered}
      $isSingleColorMode={isSingleColorMode}
      {...rest}
    >
      {children}
    </ChakraTextStyled>
  );
}

const ChakraTextStyled = styled(ChakraText)<{ $isCentered: boolean; $isSingleColorMode: boolean }>`
  text-align: ${({ $isCentered }) => $isCentered && 'center'};
  color: ${({ $isSingleColorMode }) => $isSingleColorMode && theme.colors.textGrey};
  ${nonSelectableText};
`;
