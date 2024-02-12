import React, { useContext } from 'react';
import styled from 'styled-components';
import { FloatingChatContext } from '@context/FloatingChatContext';
import { ButtonType, Size } from '@utils/constants';
import { theme } from '@utils/theme';
import Button from '@components/common/basic/Button';
import Heading from '@components/common/basic/Heading';
import FaqQuestionAnswer, { FaqQuestionAnswerProps } from '@components/landing/content/faq/FaqQuestionAnswer';

export default function SectionFaq() {
  const { isVisible, toggleVisibility, reToggleVisibility } = useContext(FloatingChatContext);

  const onClick = () => {
    if (!isVisible) {
      toggleVisibility();
    } else {
      reToggleVisibility();
    }
  };

  const faqData: FaqQuestionAnswerProps[] = [
    {
      question: 'Какой-то вопрос',
      answer: 'Какой-то ответ Какой-то ответ Какой-то ответ Какой-то ответ Какой-то ответ Какой-то ответ Какой-то ответ Какой-то ответ Какой-то ответ Какой-то ответ Какой-то ответ Какой-то ответ Какой-то ответ Какой-то ответ Какой-то ответ Какой-то ответ Какой-то ответ Какой-то ответ Какой-то ответ Какой-то ответ Какой-то ответ Какой-то ответ Какой-то ответ Какой-то ответ Какой-то ответ Какой-то ответ Какой-то ответ',
    },
    {
      question: 'Какой-то вопрос',
      answer: 'Какой-то ответ Какой-то ответ Какой-то ответ Какой-то ответ Какой-то ответ Какой-то ответ Какой-то ответ Какой-то ответ Какой-то ответ Какой-то ответ Какой-то ответ Какой-то ответ Какой-то ответ Какой-то ответ Какой-то ответ Какой-то ответ Какой-то ответ Какой-то ответ Какой-то ответ Какой-то ответ Какой-то ответ Какой-то ответ Какой-то ответ Какой-то ответ Какой-то ответ Какой-то ответ Какой-то ответ',
    },
    {
      question: 'Какой-то вопрос',
      answer: 'Какой-то ответ Какой-то ответ Какой-то ответ Какой-то ответ Какой-то ответ Какой-то ответ Какой-то ответ Какой-то ответ Какой-то ответ Какой-то ответ Какой-то ответ Какой-то ответ Какой-то ответ Какой-то ответ Какой-то ответ Какой-то ответ Какой-то ответ Какой-то ответ Какой-то ответ Какой-то ответ Какой-то ответ Какой-то ответ Какой-то ответ Какой-то ответ Какой-то ответ Какой-то ответ Какой-то ответ',
    },
    {
      question: 'Какой-то вопрос',
      answer: 'Какой-то ответ Какой-то ответ Какой-то ответ Какой-то ответ Какой-то ответ Какой-то ответ Какой-то ответ Какой-то ответ Какой-то ответ Какой-то ответ Какой-то ответ Какой-то ответ Какой-то ответ Какой-то ответ Какой-то ответ Какой-то ответ Какой-то ответ Какой-то ответ Какой-то ответ Какой-то ответ Какой-то ответ Какой-то ответ Какой-то ответ Какой-то ответ Какой-то ответ Какой-то ответ Какой-то ответ',
    },
    {
      question: 'Какой-то вопрос',
      answer: 'Какой-то ответ Какой-то ответ Какой-то ответ Какой-то ответ Какой-то ответ Какой-то ответ Какой-то ответ Какой-то ответ Какой-то ответ Какой-то ответ Какой-то ответ Какой-то ответ Какой-то ответ Какой-то ответ Какой-то ответ Какой-то ответ Какой-то ответ Какой-то ответ Какой-то ответ Какой-то ответ Какой-то ответ Какой-то ответ Какой-то ответ Какой-то ответ Какой-то ответ Какой-то ответ Какой-то ответ',
    },
    {
      question: 'Какой-то вопрос',
      answer: 'Какой-то ответ Какой-то ответ Какой-то ответ Какой-то ответ Какой-то ответ Какой-то ответ Какой-то ответ Какой-то ответ Какой-то ответ Какой-то ответ Какой-то ответ Какой-то ответ Какой-то ответ Какой-то ответ Какой-то ответ Какой-то ответ Какой-то ответ Какой-то ответ Какой-то ответ Какой-то ответ Какой-то ответ Какой-то ответ Какой-то ответ Какой-то ответ Какой-то ответ Какой-то ответ Какой-то ответ',
    },
  ];

  return (
    <Content>
      <BlockFaq>
        {faqData.map((faq, index) => (
          <FaqQuestionAnswer
            key={index}
            question={faq.question}
            answer={faq.answer}
          />
        ))}
      </BlockFaq>
      <BlockQuestionsLeft>
        <QuestionsLeftContainer>
          <Heading isCentered size={Size.MD}>Остались вопросы?</Heading>
          <Button buttonType={ButtonType.BUTTON} buttonText="Напишите мне" onClick={onClick} />
        </QuestionsLeftContainer>
      </BlockQuestionsLeft>
    </Content>
  );
}

const Content = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
`;

const BlockFaq = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 850px;
`;

const BlockQuestionsLeft = styled.div`
    display: flex;
`;

const QuestionsLeftContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 350px;
    gap: 20px;

    border: ${theme.stylesToDelete.borderWidth} ${theme.stylesToDelete.borderStyle} ${theme.colors.light.borderColor};
    border-radius: 30px;
    background-color: ${theme.colors.light.bgColor};
    padding: 20px 35px;
    height: fit-content;
`;
