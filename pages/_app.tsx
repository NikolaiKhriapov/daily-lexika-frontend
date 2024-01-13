import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import AuthProvider from '@context/AuthContext';
import { theme } from '@utils/theme';

function MyApp({ Component, pageProps }: { Component: any; pageProps: any }) {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;
