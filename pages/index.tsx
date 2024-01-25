import React from 'react';
import AuthPageProvider from '@context/AuthPageContext';
import { AppInfo } from '@utils/constants';
import AuthPageContent from '@components/auth/AuthPageContent';
import AuthPageLayout from '@components/shared/layout/AuthPageLayout';

export default function HomePage() {
  return (
    <AuthPageProvider>
      <AuthPageLayout title={AppInfo.NAME} description={AppInfo.DESCRIPTION}>
        <AuthPageContent />
      </AuthPageLayout>
    </AuthPageProvider>
  );
}
