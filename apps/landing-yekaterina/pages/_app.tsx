import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react';
import { GlobalStyle } from '@landing-yekaterina/components/GlobalStyle';
import { store } from '@landing-yekaterina/store/index';
import { getStoredLocale, resolveBrowserLocale } from '@landing-yekaterina/utils/locale';
import { theme } from '@library/shared/utils';

import i18n from '../src/i18n';

const lightColorModeManager = {
  type: 'localStorage' as const,
  get: () => 'light' as const,
  set: () => {},
};

export default function MyApp({ Component, pageProps }: { Component: any; pageProps: any }) {
  useEffect(() => {
    const storedLocale = getStoredLocale();
    const resolvedLocale = storedLocale || resolveBrowserLocale();

    if (i18n.language !== resolvedLocale) {
      i18n.changeLanguage(resolvedLocale);
    }
  }, []);

  return (
    <>
      <GlobalStyle />
      <ChakraProvider theme={theme} colorModeManager={lightColorModeManager}>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </ChakraProvider>
    </>
  );
}
