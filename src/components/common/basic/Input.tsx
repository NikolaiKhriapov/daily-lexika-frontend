import React from 'react';
import { Input as ChakraInput, InputProps, useBreakpointValue } from '@chakra-ui/react';
import { theme } from '@utils/theme';
import { Size } from '@utils/constants';

export default function Input({ children, ...rest }: InputProps) {
  return (
    <ChakraInput
      focusBorderColor={theme.colors.gray['400']}
      autoComplete='off'
      {...rest}
    >
      {children}
    </ChakraInput>
  );
}
