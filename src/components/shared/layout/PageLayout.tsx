import React, { ReactNode } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import { ColorMode, useColorMode } from '@chakra-ui/react';
import { useGetAllReviewsQuery } from '@store/api/reviewsAPI';
import { useGetStatisticsQuery } from '@store/api/statisticsAPI';
import { useGetAllWordDataQuery } from '@store/api/wordDataAPI';
import { useGetAllWordPacksQuery } from '@store/api/wordPacksAPI';
import { Breakpoint } from '@utils/constants';
import { mediaBreakpointUp } from '@utils/functions';
import { theme } from '@utils/theme';
import Content from '@components/shared/Content';
import Footer from '@components/shared/Footer';
import Navbar from '@components/shared/Navbar';
import Sidebar from '@components/shared/Sidebar';

type Props = {
  title: string;
  description: string;
  children: ReactNode;
};

export default function PageLayout(props: Props) {
  const { title, description, children } = props;

  const { colorMode } = useColorMode();

  useGetAllReviewsQuery();
  useGetAllWordPacksQuery();
  useGetStatisticsQuery();
  useGetAllWordDataQuery();

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, minimal-ui, user-scalable=no" />
      </Head>
      <Container $colorMode={colorMode}>
        <Navbar />
        <SidebarAndContentContainer $colorMode={colorMode}>
          <Sidebar />
          <Content>{children}</Content>
        </SidebarAndContentContainer>
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

const SidebarAndContentContainer = styled.div<{ $colorMode: ColorMode }>`
    ${mediaBreakpointUp(Breakpoint.DESKTOP)} {
        display: flex;
        flex-direction: row;
        justify-content: center;
        gap: 40px;
        margin: 100px 100px 0 100px;
        min-height: calc(100vh - 170px);
    }
`;
