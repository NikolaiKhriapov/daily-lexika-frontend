import React from 'react';
import Footer from '@components/shared/Footer';
import AuthPage from '../components/auth/AuthPage';
import { AuthFormType, Page } from '../src/utils/constants';

export default function HomePage() {
  return (
    <>
      <AuthPage
        data={{
          heading: 'Sign in to your account',
          link: { href: Page.REGISTER, text: 'Don\'t have an account? Register now' },
          authForm: { formType: AuthFormType.LOGIN, onSuccess: null },
        }}
      />
      <Footer email appVersion={false} forDesktopOnly={false} />
    </>
  );
}
