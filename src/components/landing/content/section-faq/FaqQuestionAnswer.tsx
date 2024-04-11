import React, { useState } from 'react';
import { FaAngleDown } from 'react-icons/fa6';
import styled from 'styled-components';
import { FontWeight, Size } from '@utils/constants';
import { theme } from '@utils/theme';
import Text from '@components/ui-common/basic/Text';

export type FaqQuestionAnswerProps = {
  question: string;
  answer: string;
};

export default function FaqQuestionAnswer(props: FaqQuestionAnswerProps) {
  const { question, answer } = props;

  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <Container>
      <QuestionAndIcon onClick={toggleVisibility}>
        <Text fontWeight={FontWeight.SEMIBOLD} size={Size.LG}>{question}</Text>
        <OpenIcon $isVisible={isVisible} />
      </QuestionAndIcon>
      <Answer $isVisible={isVisible}>
        <Text fontWeight={FontWeight.SEMIBOLD}>{answer}</Text>
      </Answer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  border: ${theme.stylesToDelete.borderWidth} ${theme.stylesToDelete.borderStyle} ${theme.colors.light.borderColor};
  border-radius: 30px;
  width: 100%;
  background-color: ${theme.colors.light.bgColor};
  max-height: fit-content;
`;

const QuestionAndIcon = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  padding: 20px 35px;
`;

const OpenIcon = styled(FaAngleDown)<{ $isVisible: boolean }>`
  width: 20px;
  height: 20px;
  transform: ${({ $isVisible }) => ($isVisible ? 'rotate(180deg)' : 'rotate(0deg)')};
  transition: transform 0.5s ease;
`;

const Answer = styled.div<{ $isVisible: boolean }>`
  padding: ${({ $isVisible }) => ($isVisible ? '0 35px 20px' : '0 35px')};
  overflow: hidden;
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
  max-height: ${({ $isVisible }) => ($isVisible ? '500px' : '0')};
  transition: opacity 0.5s ease, max-height 0.5s ease, padding-bottom 0.5s ease;
`;
