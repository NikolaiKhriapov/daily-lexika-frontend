import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import AuthProvider from '@context/AuthContext';
import NotificationsProvider from '@context/NotificationsContext';
import { theme } from '@utils/theme';

export default function MyApp({ Component, pageProps }: { Component: any; pageProps: any }) {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <NotificationsProvider>
          <Component {...pageProps} />
        </NotificationsProvider>
      </AuthProvider>
    </ChakraProvider>
  );
}
