import React from 'react';
import { LandingInfo } from '@utils/landing/constants';
import Content from '@components/landing/content/Content';
import LandingLayout from '@components/landing/LandingLayout';

export default function LandingPage() {
  return (
    <LandingLayout title={LandingInfo.TITLE} description={LandingInfo.DESCRIPTION}>
      <Content />
    </LandingLayout>
  );
}
