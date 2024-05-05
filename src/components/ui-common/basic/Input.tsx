import React from 'react';
import { Input as ChakraInput, InputProps, useColorMode } from '@chakra-ui/react';
import { borderStyles } from '@utils/functions';
import { theme } from '@utils/theme';

export default function Input({ children, ...rest }: InputProps) {
  const { colorMode } = useColorMode();

  return (
    <ChakraInput
      focusBorderColor={theme.colors.gray['400']}
      border={borderStyles(colorMode)}
      borderRadius={theme.stylesToDelete.borderRadius}
      autoComplete='off'
      {...rest}
    >
      {children}
    </ChakraInput>
  );
}
