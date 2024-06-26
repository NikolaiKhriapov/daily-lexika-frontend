import React from 'react';
import Content from '@daily-lexika/components/privacy-policy/content/Content';
import PrivacyPolicyLayout from '@daily-lexika/components/privacy-policy/PrivacyPolicyLayout';
import { PrivacyPolicyInfo } from '@daily-lexika/utils/constants';

export default function PrivacyPolicyPage() {
  return (
    <PrivacyPolicyLayout title={PrivacyPolicyInfo.TITLE} description={PrivacyPolicyInfo.DESCRIPTION}>
      <Content />
    </PrivacyPolicyLayout>
  );
}
