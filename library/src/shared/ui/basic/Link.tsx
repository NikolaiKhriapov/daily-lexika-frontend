import React from 'react';
import { Link as ChakraLink, LinkProps } from '@chakra-ui/react';
import { theme } from '@library/shared/utils';

export function Link({ children, ...rest }: LinkProps) {
  return (
    <ChakraLink
      color={theme.stylesToDelete.link}
      {...rest}
    >
      {children}
    </ChakraLink>
  );
}
