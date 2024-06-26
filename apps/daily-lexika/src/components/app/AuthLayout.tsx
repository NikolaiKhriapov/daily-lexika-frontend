import React, { ReactNode } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import { ColorMode, useColorMode } from '@chakra-ui/react';
import AuthFooter from '@daily-lexika/components/app/footer/AuthFooter';
import { nonSelectableText, theme } from '@library/shared/utils';

type Props = {
  title: string;
  description: string;
  children: ReactNode;
};

export default function AuthLayout(props: Props) {
  const { title, description, children } = props;

  const { colorMode } = useColorMode();

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, minimal-ui, user-scalable=no" />
      </Head>
      <Container $colorMode={colorMode}>
        {children}
        <AuthFooter />
      </Container>
    </>
  );
}

const Container = styled.div<{ $colorMode: ColorMode }>`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  background-color: ${({ $colorMode }) => theme.colors[$colorMode].background};
  ${nonSelectableText};
`;
