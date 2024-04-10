import React, { ReactNode } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import { theme } from '@utils/theme';
import FloatingChat from '@components/landing/floating-chat/FloatingChat';
import LandingFooter from '@components/landing/footer/LandingFooter';
import LandingNavbar from '@components/landing/navbar/LandingNavbar';

type Props = {
  title: string;
  description: string;
  children: ReactNode;
};

export default function LandingLayout(props: Props) {
  const { title, description, children } = props;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, minimal-ui, user-scalable=no" />
      </Head>
      <Container>
        <LandingNavbar />
        <Content>{children}</Content>
        <FloatingChat />
        <LandingFooter />
      </Container>
    </>
  );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: ${theme.colors.light.background};
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
`;
