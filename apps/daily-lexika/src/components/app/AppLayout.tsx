import React, { ReactNode } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import { ColorMode, useColorMode } from '@chakra-ui/react';
import AppContent from '@daily-lexika/components/app/content/AppContent';
import InterfaceLanguageSelectionWindow from '@daily-lexika/components/app/content/InterfaceLanguageSelectionWindow';
import TranslationLanguageSelectionWindow from '@daily-lexika/components/app/content/TranslationLanguageSelectionWindow';
import AppFooter from '@daily-lexika/components/app/footer/AppFooter';
import AppNavbar from '@daily-lexika/components/app/navbar/AppNavbar';
import AppSidebar from '@daily-lexika/components/app/sidebar/AppSidebar';
import { useGetAllReviewsQuery } from '@daily-lexika/store/api/reviewsAPI';
import { useGetStatisticsQuery } from '@daily-lexika/store/api/statisticsAPI';
import { useGetUserQuery } from '@daily-lexika/store/api/userAPI';
import { useGetAllWordPacksQuery } from '@daily-lexika/store/api/wordPacksAPI';
import { Page } from '@daily-lexika/utils/Pages';
import { Breakpoint, mediaBreakpointUp, nonHighlightableTap, nonSelectableText, theme } from '@library/shared/utils';

type Props = {
  page: Page;
  title: string;
  description: string;
  children: ReactNode;
};

export default function AppLayout(props: Props) {
  const { page, title, description, children } = props;

  const { colorMode } = useColorMode();
  const { data: user } = useGetUserQuery();
  useGetAllReviewsQuery();
  useGetAllWordPacksQuery();
  useGetStatisticsQuery();

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, minimal-ui, user-scalable=no" />
      </Head>
      <Container $colorMode={colorMode}>
        <AppNavbar />
        <SidebarAndContentContainer $colorMode={colorMode}>
          <AppSidebar page={page} />
          <AppContent>
            {user && !user.interfaceLanguage && <InterfaceLanguageSelectionWindow />}
            {user && user.interfaceLanguage && !user.translationLanguage && <TranslationLanguageSelectionWindow />}
            {user && user.interfaceLanguage && user.translationLanguage && children}
          </AppContent>
        </SidebarAndContentContainer>
        <AppFooter />
      </Container>
    </>
  );
}

const Container = styled.div<{ $colorMode: ColorMode }>`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100vw;
  background-color: ${({ $colorMode }) => theme.colors[$colorMode].background};
  ${nonHighlightableTap};
  ${nonSelectableText};
`;

const SidebarAndContentContainer = styled.div<{ $colorMode: ColorMode }>`
  display: flex;

  ${mediaBreakpointUp(Breakpoint.DESKTOP)} {
    flex-direction: row;
    justify-content: center;
    gap: 40px;
    margin: 100px 100px 0 100px;
    min-height: calc(100vh - 170px);
  }
`;
