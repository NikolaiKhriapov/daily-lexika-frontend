import React from 'react';
import FloatingChatProvider from '@context/FloatingChatContext';
import { LandingInfo } from '@utils/constantsLanding';
import LandingPageContent from '@components/landing/content/LandingPageContent';
import LandingLayout from '@components/landing/LandingLayout';

export default function LandingPage() {
  return (
    <FloatingChatProvider>
      <LandingLayout title={LandingInfo.TITLE} description={LandingInfo.DESCRIPTION}>
        <LandingPageContent />
      </LandingLayout>
    </FloatingChatProvider>
  );
}
