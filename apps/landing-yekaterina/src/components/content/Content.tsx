import React from 'react';
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
  const sectionMapping = [
    {
      id: SectionId.INTRO,
      heading: 'Екатерина Щербакова',
      content: <SectionIntro />,
    },
    {
      id: SectionId.DEMO_CLASS,
      heading: 'Бесплатное пробное занятие',
      content: <SectionDemoClass />,
    },
    {
      id: SectionId.CONSULTATION,
      heading: 'Консультации для преподавателей',
      content: <SectionConsultationForTeachers />,
    },
    {
      id: SectionId.FEEDBACK,
      heading: 'Отзывы от студентов',
      content: <SectionFeedback />,
    },
    {
      id: SectionId.DISCOUNTS,
      heading: 'Скидки за приглашенных студентов',
      content: <SectionDiscounts />,
    },
    {
      id: SectionId.FAQ,
      heading: 'Часто задаваемые вопросы',
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
  padding: 0 80px 100px 80px;
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
