import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import AuthProvider from '@context/AuthContext';
import NotificationsProvider from '@context/NotificationsContext';
import { fonts } from '@utils/fonts';
import { theme } from '@utils/theme';

export default function MyApp({ Component, pageProps }: { Component: any; pageProps: any }) {
  return (
    <>
      <style jsx global>
        {`
            :root {
                --font-rubik: ${fonts.rubik.style.fontFamily};
                --font-noto-serif-sc: ${fonts.notoSerifSC.style.fontFamily};
            }
        `}
      </style>
      <ChakraProvider theme={theme}>
        <AuthProvider>
          <NotificationsProvider>
            <Component {...pageProps} />
          </NotificationsProvider>
        </AuthProvider>
      </ChakraProvider>
    </>
  );
}
