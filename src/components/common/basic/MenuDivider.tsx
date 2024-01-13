import React from 'react';
import styled from 'styled-components';
import { MenuDivider as ChakraMenuDivider, MenuDividerProps } from '@chakra-ui/react';

interface Props extends MenuDividerProps {
  isNarrow?: boolean;
}

MenuDivider.defaultProps = {
  isNarrow: false,
};

export default function MenuDivider({ isNarrow, ...rest }: Props) {
  return <MenuDividerStyled $isNarrow={isNarrow} {...rest} />;
}

const MenuDividerStyled = styled(ChakraMenuDivider)<{ $isNarrow: boolean }>`
  margin-top: ${({ $isNarrow }) => $isNarrow && '1px'} !important;
  margin-bottom: ${({ $isNarrow }) => $isNarrow && '1px'} !important;
`;
