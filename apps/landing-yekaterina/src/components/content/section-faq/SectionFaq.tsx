import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaAnglesDown, FaAnglesUp } from 'react-icons/fa6';
import styled from 'styled-components';
import FaqQuestionAnswer, { FaqItem } from '@landing-yekaterina/components/content/section-faq/FaqQuestionAnswer';
import { useAppDispatch, useAppSelector } from '@landing-yekaterina/store/hooks/hooks';
import { toggleVisibility } from '@landing-yekaterina/store/reducers/floatingChatSlice';
import { Button, ButtonType, Heading } from '@library/shared/ui';
import { Size, theme } from '@library/shared/utils';

export default function SectionFaq() {
  const dispatch = useAppDispatch();
  const { isVisible } = useAppSelector((state) => state.floatingChatSlice);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [listHeight, setListHeight] = useState<number | null>(null);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);
  const { t } = useTranslation();

  const onClick = () => {
    dispatch(toggleVisibility());

    if (isVisible) {
      setTimeout(() => {
        dispatch(toggleVisibility());
      }, 150);
    }
  };

  const faqData = t('faq.items', { returnObjects: true }) as FaqItem[];

  const calculateListHeight = useCallback(() => {
    const count = showAll ? faqData.length : Math.min(5, faqData.length);
    const totalHeight = itemRefs.current
      .slice(0, count)
      .reduce((sum, el) => sum + (el?.offsetHeight ?? 0), 0);
    const gaps = count > 1 ? (count - 1) * 10 : 0;

    setListHeight(totalHeight + gaps);
  }, [faqData.length, showAll]);

  useLayoutEffect(() => {
    calculateListHeight();
  }, [calculateListHeight, openIndex]);

  useEffect(() => {
    if (typeof ResizeObserver === 'undefined') {
      return undefined;
    }

    const observer = new ResizeObserver(() => {
      calculateListHeight();
    });

    itemRefs.current.forEach((item) => {
      if (item) {
        observer.observe(item);
      }
    });

    return () => observer.disconnect();
  }, [calculateListHeight]);

  const toggleShowAll = () => {
    setShowAll((prev) => !prev);
    setOpenIndex(null);
  };

  return (
    <Content>
      <BlockFaq>
        <FaqList style={{ height: listHeight ?? 'auto' }}>
          {faqData.map((faq, index) => (
            <FaqItemWrapper
              key={index}
              ref={(el) => {
                itemRefs.current[index] = el;
              }}
            >
              <FaqQuestionAnswer
                question={faq.question}
                answer={faq.answer}
                isVisible={openIndex === index}
                onToggle={() => setOpenIndex(openIndex === index ? null : index)}
              />
            </FaqItemWrapper>
          ))}
        </FaqList>
        {faqData.length > 5 && (
          <FaqToggle>
            <ToggleButton type="button" onClick={toggleShowAll}>
              {showAll ? t('faq.toggle.collapse') : t('faq.toggle.showAll')}
              {showAll ? <ToggleIcon as={FaAnglesUp} /> : <ToggleIcon as={FaAnglesDown} />}
            </ToggleButton>
          </FaqToggle>
        )}
      </BlockFaq>
      <BlockQuestionsLeft>
        <QuestionsLeftContainer>
          <Heading isCentered size={Size.MD}>{t('faq.questionsLeft.title')}</Heading>
          <Button buttonType={ButtonType.BUTTON} buttonText={t('faq.questionsLeft.buttonText')} onClick={onClick} />
        </QuestionsLeftContainer>
      </BlockQuestionsLeft>
    </Content>
  );
}

const Content = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 10px;
  width: 100%;
`;

const BlockFaq = styled.div`
  display: flex;
  flex-direction: column;
  width: max-content;
`;

const FaqList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow: hidden;
  transition: height 0.35s ease;
  will-change: height;
`;

const FaqItemWrapper = styled.div`
  width: 100%;
`;

const FaqToggle = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 10px;
`;

const ToggleButton = styled.button`
  border: 1px solid ${theme.colors.light.borderColor};
  border-radius: 999px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(245, 245, 245, 0.9));
  color: ${theme.colors.text};
  padding: 10px 18px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  letter-spacing: 0.2px;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
    background: linear-gradient(135deg, rgba(255, 255, 255, 1), rgba(238, 238, 238, 1));
  }

  &:active {
    transform: translateY(0);
    box-shadow: none;
  }

  &:focus-visible {
    outline: 2px solid ${theme.colors.light.borderColor};
    outline-offset: 2px;
  }
`;

const ToggleIcon = styled(FaAnglesDown)`
  width: 14px;
  height: 14px;
`;

const BlockQuestionsLeft = styled.div`
  display: flex;
`;

const QuestionsLeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 300px;
  gap: 20px;

  border: ${theme.stylesToDelete.borderWidth} ${theme.stylesToDelete.borderStyle} ${theme.colors.light.borderColor};
  border-radius: 30px;
  background-color: ${theme.colors.light.bgColor};
  padding: 20px 35px;
  height: fit-content;
`;
