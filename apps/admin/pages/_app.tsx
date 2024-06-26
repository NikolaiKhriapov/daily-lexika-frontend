import React from 'react';
import { Provider } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react';
import AuthProvider from '@admin/context/AuthContext';
import { store } from '@admin/store/index';
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
