import React from 'react';
import { Provider } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react';
import { GlobalStyle } from '@landing-yekaterina/components/GlobalStyle';
import { store } from '@landing-yekaterina/store/index';
import { theme } from '@library/shared/utils';

export default function MyApp({ Component, pageProps }: { Component: any; pageProps: any }) {
  return (
    <>
      <GlobalStyle />
      <ChakraProvider theme={theme}>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </ChakraProvider>
    </>
  );
}
