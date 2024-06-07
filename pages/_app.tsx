import React from 'react';
import { Provider } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react';
import AppInstallationProvider from '@context/app/AppInstallationContext';
import AuthProvider from '@context/app/AuthContext';
import LanguageProvider from '@context/app/LanguageContext';
import { store } from '@store/index';
import { theme } from '@utils/theme';
import { GlobalStyle } from '@components/GlobalStyle';

import '../i18n';

export default function MyApp({ Component, pageProps }: { Component: any; pageProps: any }) {
  return (
    <>
      <GlobalStyle />
      <ChakraProvider theme={theme}>
        <Provider store={store}>
          <LanguageProvider>
            <AppInstallationProvider>
              <AuthProvider>
                <Component {...pageProps} />
              </AuthProvider>
            </AppInstallationProvider>
          </LanguageProvider>
        </Provider>
      </ChakraProvider>
    </>
  );
}
