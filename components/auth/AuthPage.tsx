import React, { useEffect } from 'react';
import { ColorMode, useColorMode } from '@chakra-ui/react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';
import { Breakpoint, Page, Size } from '../../src/utils/constants';
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
    <Container $colorMode={colorMode}>
      <Heading size={Size.LG}>{data.heading}</Heading>
      <AuthForm formType={data.authForm.formType} onSuccess={data.authForm.onSuccess} />
      <Link href={data.link.href}>{data.link.text}</Link>
    </Container>
  );
}

const Container = styled.div<{ $colorMode: ColorMode }>`
  min-height: 100vh;
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
