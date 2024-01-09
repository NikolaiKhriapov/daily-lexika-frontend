import React from 'react';
import { Input as ChakraInput, InputProps } from '@chakra-ui/react';
import { theme } from '../../../src/utils/theme';

export default function Input({ children, ...rest }: InputProps) {
  return (
    <ChakraInput
      focusBorderColor={theme.colors.gray['400']}
      {...rest}
    >
      {children}
    </ChakraInput>
  );
}
