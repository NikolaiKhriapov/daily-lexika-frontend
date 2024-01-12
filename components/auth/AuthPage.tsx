import React, { useEffect } from 'react';
import { ColorMode, useColorMode } from '@chakra-ui/react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useAuth } from '../context/AuthContext';
import { AppInfo, Breakpoint, Page, Size } from '../../src/utils/constants';
import AuthForm from './AuthForm';
import { mediaBreakpointUp } from '../../src/utils/functions';
import Link from '../common/basic/Link';
import Heading from '../common/basic/Heading';
import { theme } from '../../src/utils/theme';

type Props = {
  data: any;
};

export default function AuthPage(props: Props) {
  const { data } = props;

  const router = useRouter();
  const { user } = useAuth();
  const { colorMode } = useColorMode();

  useEffect(() => {
    if (user) {
      router.push(Page.REVIEWS);
    }
  });

  return (
    <>
      <Head>
        <title>{AppInfo.NAME}</title>
        <meta name="description" content={AppInfo.DESCRIPTION} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, minimal-ui, user-scalable=no" />
      </Head>
      <Container $colorMode={colorMode}>
        <Heading size={Size.LG}>{data.heading}</Heading>
        <AuthForm formType={data.authForm.formType} onSuccess={data.authForm.onSuccess} />
        <Link href={data.link.href}>{data.link.text}</Link>
      </Container>
    </>
  );
}

const Container = styled.div<{ $colorMode: ColorMode }>`
  min-height: calc(100vh - 70px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${({ $colorMode }) => theme.colors[$colorMode].background};
  gap: 30px;

  ${mediaBreakpointUp(Breakpoint.TABLET)} {
    gap: 35px;
  }

  ${mediaBreakpointUp(Breakpoint.DESKTOP)} {
    gap: 40px;
  }
`;
