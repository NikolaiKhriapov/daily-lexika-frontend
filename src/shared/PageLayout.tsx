import { ColorMode, useColorMode } from '@chakra-ui/react';
import Content from 'components/shared/Content';
import styled from 'styled-components';
import React, { ReactNode } from 'react';
import Sidebar from 'components/shared/Sidebar';
import Navbar from 'components/shared/Navbar';
import Head from 'next/head';
import Footer from '@components/shared/Footer';
import { theme } from '../utils/theme';
import { AppInfo } from '../utils/constants';

type Props = {
  title: string;
  description: string;
  children: ReactNode;
};

export default function PageLayout(props: Props) {
  const { title, description, children } = props;

  const { colorMode } = useColorMode();

  return (
    <>
      <Head>
        <title>{title || AppInfo.NAME}</title>
        <meta name="description" content={description || AppInfo.DESCRIPTION} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, minimal-ui, user-scalable=no" />
      </Head>
      <Container $colorMode={colorMode}>
        <Navbar />
        <Sidebar />
        <Content>{children}</Content>
        <Footer email={false} appVersion />
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
`;
