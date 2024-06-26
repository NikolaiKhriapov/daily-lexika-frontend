import React from 'react';
import styled from 'styled-components';
import { MenuDivider as ChakraMenuDivider, MenuDividerProps } from '@chakra-ui/react';

interface Props extends MenuDividerProps {
  isNarrow?: boolean;
}

export function MenuDivider(props: Props) {
  const { isNarrow = false, ...rest } = props;

  return <MenuDividerStyled $isNarrow={isNarrow} {...rest} />;
}

const MenuDividerStyled = styled(ChakraMenuDivider)<{ $isNarrow: boolean }>`
  margin-top: ${({ $isNarrow }) => $isNarrow && '1px'} !important;
  margin-bottom: ${({ $isNarrow }) => $isNarrow && '1px'} !important;
`;
