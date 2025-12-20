import React from 'react';
import { useTranslation } from 'react-i18next';
import styled, { keyframes } from 'styled-components';
import Feedback, { FeedbackProps } from '@landing-yekaterina/components/content/section-feedback/Feedback';

export default function SectionFeedback() {
  const { t } = useTranslation();

  const feedbackData = t('feedback.items', { returnObjects: true }) as FeedbackProps[];

  const loopingFeedback = [...feedbackData, ...feedbackData];

  return (
    <Container>
      <Content speed={120}>
        {loopingFeedback.map((feedback, index) => (
          <Feedback
            key={`${feedback.nameAndAge}-${feedback.occupation}-${index}`}
            nameAndAge={feedback.nameAndAge}
            occupation={feedback.occupation}
            durationOfStudy={feedback.durationOfStudy}
            text={feedback.text}
          />
        ))}
      </Content>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  max-width: 1440px;
  height: 450px;
  margin: 0 auto;
  position: relative;
  user-select: none;
  mask-image: linear-gradient(to right, rgba(0, 0, 0, 0), rgb(0, 0, 0) 10%, rgb(0, 0, 0) 90%, rgba(0, 0, 0, 0));
  overflow: hidden;
`;

const move = keyframes`
  0% {
      transform: translate(0, 0);
  }
  100% {
      transform: translate(-50%, 0);
  }
`;

const Content = styled.div<{ speed: number }>`
  will-change: transform;
  display: flex;
  gap: 30px;
  position: absolute;
  top: 0;
  left: 0;
  width: max-content;
  animation: ${move} linear infinite;
  animation-duration: ${({ speed }) => `${speed}s`};
`;
