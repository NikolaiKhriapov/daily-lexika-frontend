import React from 'react';
import { PrivacyPolicyInfo } from '@utils/privacy-policy/constants';
import Content from '@components/privacy-policy/content/Content';
import PrivacyPolicyLayout from '@components/privacy-policy/PrivacyPolicyLayout';

export default function PrivacyPolicyPage() {
  return (
    <PrivacyPolicyLayout title={PrivacyPolicyInfo.TITLE} description={PrivacyPolicyInfo.DESCRIPTION}>
      <Content />
    </PrivacyPolicyLayout>
  );
}
