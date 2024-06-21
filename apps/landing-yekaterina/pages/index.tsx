import React from 'react';
import Content from '@landing-yekaterina/components/content/Content';
import Layout from '@landing-yekaterina/components/Layout';
import { LandingInfo } from '@landing-yekaterina/utils/constants';

export default function Index() {
  return (
    <Layout
      title={LandingInfo.TITLE}
      description={LandingInfo.DESCRIPTION}
    >
      <Content />
    </Layout>
  );
}
