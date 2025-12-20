import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import SectionConsultationForTeachers from '@landing-yekaterina/components/content/section-consultation/SectionConsultationForTeachers';
import SectionDemoClass from '@landing-yekaterina/components/content/section-demo-class/SectionDemoClass';
import SectionDiscounts from '@landing-yekaterina/components/content/section-discounts/SectionDiscounts';
import SectionFaq from '@landing-yekaterina/components/content/section-faq/SectionFaq';
import SectionFeedback from '@landing-yekaterina/components/content/section-feedback/SectionFeedback';
import SectionIntro from '@landing-yekaterina/components/content/section-intro/SectionIntro';
import { SectionId } from '@landing-yekaterina/utils/constants';
import { Heading } from '@library/shared/ui';

export default function Content() {
  const { t } = useTranslation();

  const sectionMapping = [
    {
      id: SectionId.INTRO,
      heading: t('headings.intro'),
      content: <SectionIntro />,
    },
    {
      id: SectionId.DEMO_CLASS,
      heading: t('headings.demoClass'),
      content: <SectionDemoClass />,
    },
    {
      id: SectionId.CONSULTATION,
      heading: t('headings.consultation'),
      content: <SectionConsultationForTeachers />,
    },
    {
      id: SectionId.FEEDBACK,
      heading: t('headings.feedback'),
      content: <SectionFeedback />,
    },
    {
      id: SectionId.DISCOUNTS,
      heading: t('headings.discounts'),
      content: <SectionDiscounts />,
    },
    {
      id: SectionId.FAQ,
      heading: t('headings.faq'),
      content: <SectionFaq />,
    },
  ];

  return (
    <Container>
      {sectionMapping.map((section) => (
        <Section key={section.id} id={section.id}>
          <Heading isCentered>{section.heading}</Heading>
          {section.content}
        </Section>
      ))}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: 20px 80px 100px 80px;
`;

const Section = styled.div`
  width: 100%;
  min-height: 400px;

  display: flex;
  flex-direction: column;
  gap: 30px;
  align-items: center;
  padding-top: 80px;
`;
