import React from 'react';
import styled, { keyframes } from 'styled-components';
import Feedback, { FeedbackProps } from '@components/landing/content/section-feedback/Feedback';

export default function SectionFeedback() {
  const feedbackData: FeedbackProps[] = [
    {
      nameAndAge: 'Имя, XX лет',
      occupation: 'Род деятельности',
      durationOfStudy: 'Длительность обучения',
      text: 'Текст отзыва. Текст отзыва. Текст отзыва. Текст отзыва. Текст отзыва. Текст отзыва. Текст отзыва. '
        + 'Текст отзыва. Текст отзыва. Текст отзыва. Текст отзыва. Текст отзыва. Текст отзыва. Текст отзыва. '
        + 'Текст отзыва.',
    },
    {
      nameAndAge: 'Имя, XX лет',
      occupation: 'Род деятельности',
      durationOfStudy: 'Длительность обучения',
      text: 'Текст отзыва. Текст отзыва. Текст отзыва. Текст отзыва. Текст отзыва. Текст отзыва. Текст отзыва. '
        + 'Текст отзыва. Текст отзыва. Текст отзыва. Текст отзыва. Текст отзыва. Текст отзыва. Текст отзыва. '
        + 'Текст отзыва.',
    },
    {
      nameAndAge: 'Имя, XX лет',
      occupation: 'Род деятельности',
      durationOfStudy: 'Длительность обучения',
      text: 'Текст отзыва. Текст отзыва. Текст отзыва. Текст отзыва. Текст отзыва. Текст отзыва. Текст отзыва. '
        + 'Текст отзыва. Текст отзыва. Текст отзыва. Текст отзыва. Текст отзыва. Текст отзыва. Текст отзыва. '
        + 'Текст отзыва.',
    },
    {
      nameAndAge: 'Имя, XX лет',
      occupation: 'Род деятельности',
      durationOfStudy: 'Длительность обучения',
      text: 'Текст отзыва. Текст отзыва. Текст отзыва. Текст отзыва. Текст отзыва. Текст отзыва. Текст отзыва. '
        + 'Текст отзыва. Текст отзыва. Текст отзыва. Текст отзыва. Текст отзыва. Текст отзыва. Текст отзыва. '
        + 'Текст отзыва.',
    },
    {
      nameAndAge: 'Имя, XX лет',
      occupation: 'Род деятельности',
      durationOfStudy: 'Длительность обучения',
      text: 'Текст отзыва. Текст отзыва. Текст отзыва. Текст отзыва. Текст отзыва. Текст отзыва. Текст отзыва. '
        + 'Текст отзыва. Текст отзыва. Текст отзыва. Текст отзыва. Текст отзыва. Текст отзыва. Текст отзыва. '
        + 'Текст отзыва.',
    },
  ];

  return (
    <Container>
      <Content speed={40}>
        {feedbackData.map((feedback, index) => (
          <Feedback
            key={index}
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
  height: 380px;
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
  animation: ${move} linear infinite;
  animation-duration: ${({ speed }) => `${speed}s`};
`;
