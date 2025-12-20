import React from 'react';
import { useTranslation } from 'react-i18next';
import Content from '@landing-yekaterina/components/content/Content';
import Layout from '@landing-yekaterina/components/Layout';

export default function Index() {
  const { t } = useTranslation();

  return (
    <Layout
      title={t('meta.title')}
      description={t('meta.description')}
    >
      <Content />
    </Layout>
  );
}
