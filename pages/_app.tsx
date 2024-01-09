import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import { theme } from '../src/utils/theme';
import AuthProvider from '../components/context/AuthContext';

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
