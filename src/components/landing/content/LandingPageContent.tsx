import React from 'react';
import styled from 'styled-components';
import { SectionId } from '@utils/constantsLanding';
import Heading from '@components/common/basic/Heading';
import SectionConsultationForTeachers from '@components/landing/content/consultation/SectionConsultationForTeachers';
import SectionDemoClass from '@components/landing/content/demo-class/SectionDemoClass';
import SectionDiscounts from '@components/landing/content/discounts/SectionDiscounts';
import SectionFaq from '@components/landing/content/faq/SectionFaq';
import SectionFeedback from '@components/landing/content/feedback/SectionFeedback';
import SectionIntro from '@components/landing/content/intro/SectionIntro';

export default function LandingPageContent() {
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
