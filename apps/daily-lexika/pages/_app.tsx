import React from 'react';
import { Provider } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react';
import AuthProvider from '@daily-lexika/context/AuthContext';
import LanguageProvider from '@daily-lexika/context/LanguageContext';
import { store } from '@daily-lexika/store/index';
import { AppInstallationProvider } from '@library/shared/context';
import { GlobalStyle } from '@library/shared/ui';
import { theme } from '@library/shared/utils';

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
