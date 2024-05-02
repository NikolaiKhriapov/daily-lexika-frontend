import React from 'react';
import { Provider } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react';
import AppInstallationProvider from '@context/app/AppInstallationContext';
import AuthProvider from '@context/app/AuthContext';
import { store } from '@store/index';
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
        <Provider store={store}>
          <AppInstallationProvider>
            <AuthProvider>
              <Component {...pageProps} />
            </AuthProvider>
          </AppInstallationProvider>
        </Provider>
      </ChakraProvider>
    </>
  );
}
