import React from 'react';
import styled, { keyframes } from 'styled-components';
import Feedback, { FeedbackProps } from '@components/landing/content/feedback/Feedback';

export default function SectionFeedback() {
  const feedbackData: FeedbackProps[] = [
    {
      nameAndAge: 'Иван, 35 лет',
      occupation: 'Программист',
      durationOfStudy: '2 года',
      text: 'Преподаватель английского языка просто великолепен! Его уроки всегда интересны, он использует '
        + 'разнообразные методики, чтобы сделать процесс изучения более увлекательным. Благодаря ему, я стал более '
        + 'уверенно выражать свои мысли на английском.',
    },
    {
      nameAndAge: 'Мария, 19 лет',
      occupation: 'Студентка',
      durationOfStudy: '1 год',
      text: 'Очень приятно учиться у этого преподавателя! Его преподавательский стиль делает изучение английского '
        + 'легким и увлекательным. Всегда готов ответить на вопросы и объяснить сложные темы. Я рада, что выбрал '
        + 'именно его курс.',
    },
    {
      nameAndAge: 'Анна, 13 лет',
      occupation: 'Ученица',
      durationOfStudy: '6 месяцев',
      text: 'Преподаватель английского не только компетентен, но и вдохновляющий. Его энтузиазм заражает всех '
        + 'студентов, и это помогает нам не только изучать язык, но и полюбить процесс обучения. Спасибо за терпение '
        + 'и поддержку!',
    },
    {
      nameAndAge: 'Анна, 13 лет',
      occupation: 'Ученица',
      durationOfStudy: '6 месяцев',
      text: 'Преподаватель английского не только компетентен, но и вдохновляющий. Его энтузиазм заражает всех '
        + 'студентов, и это помогает нам не только изучать язык, но и полюбить процесс обучения. Спасибо за терпение '
        + 'и поддержку!',
    },
    {
      nameAndAge: 'Анна, 13 лет',
      occupation: 'Ученица',
      durationOfStudy: '6 месяцев',
      text: 'Преподаватель английского не только компетентен, но и вдохновляющий. Его энтузиазм заражает всех '
        + 'студентов, и это помогает нам не только изучать язык, но и полюбить процесс обучения. Спасибо за терпение '
        + 'и поддержку!',
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
