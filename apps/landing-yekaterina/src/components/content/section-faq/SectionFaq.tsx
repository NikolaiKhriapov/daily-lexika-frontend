import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { FaAnglesDown, FaAnglesUp } from 'react-icons/fa6';
import FaqQuestionAnswer, { FaqItem } from '@landing-yekaterina/components/content/section-faq/FaqQuestionAnswer';
import { useAppDispatch, useAppSelector } from '@landing-yekaterina/store/hooks/hooks';
import { toggleVisibility } from '@landing-yekaterina/store/reducers/floatingChatSlice';
import { Button, ButtonType, Heading } from '@library/shared/ui';
import { Size , theme } from '@library/shared/utils';

export default function SectionFaq() {
  const dispatch = useAppDispatch();
  const { isVisible } = useAppSelector((state) => state.floatingChatSlice);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [listHeight, setListHeight] = useState<number | null>(null);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);

  const onClick = () => {
    dispatch(toggleVisibility());

    if (isVisible) {
      setTimeout(() => {
        dispatch(toggleVisibility());
      }, 150);
    }
  };

  const faqData: FaqItem[] = [
    {
      question: 'Пробное занятие платное?',
      answer: 'Нет, пробное занятие бесплатное и ни к чему вас не обязывает.',
    },
    {
      question: 'Зачем нужно пробное занятие?',
      answer: 'Пробное занятие нужно, чтобы определить ваш уровень, согласовать программу обучения и понять, подходим ли мы друг другу.',
    },
    {
      question: 'Как будет проходить пробное занятие?',
      answer: 'Я отправлю вам ссылку для присоединения за несколько минут до начала урока. Мы познакомимся, '
        + 'определим ваш уровень и цели. Затем я покажу вам формат работы, расскажу о методике и о том, что '
        + 'нужно будет подготовить. В конце мы обсудим организационные моменты и сможем ответить на все '
        + 'оставшиеся вопросы.',
    },
    {
      question: 'Сколько времени занимает пробное занятие?',
      answer: 'Пробное занятие занимает 15–30 минут.',
    },
    {
      question: 'Нужно ли что-то готовить к пробному занятию?',
      answer: 'Нужно только заранее установить приложение Zoom.',
    },
    {
      question: 'Что, если я опоздаю или не смогу прийти на пробное занятие?',
      answer: 'Я подожду 10 минут, но прошу предупредить заранее, чтобы мы могли перенести встречу на другое удобное время.',
    },
    {
      question: 'Как быстро я начну говорить?',
      answer: 'Зависит от вашего усердия и частоты занятий. Первые результаты в виде простых фраз появятся уже с '
        + 'первого урока, так как мы большое внимание уделяем практике всего выученного материала.',
    },
    {
      question: 'Могу ли я заниматься только разговорным китайским или изучать только грамматику?',
      answer: 'Да, я составляю программу под ваши цели. Однако нужно учитывать, что лучший результат вы получите от '
        + 'комплексной работы, развивая все навыки языка: говорение, аудирование, грамматику и письмо.',
    },
    {
      question: 'Используете ли вы учебники или свои материалы?',
      answer: 'Я использую комбинацию: проверенные современные учебные пособия (как основу) и собственные наработки, '
        + 'а также адаптированные аутентичные материалы. Мы подбираем инструменты, которые наилучшим образом '
        + 'подходят под ваши цели.',
    },
    {
      question: 'Какую программу мы будем использовать?',
      answer: 'Зависит от ваших целей. Мы обсудим это на пробном занятии и подберем программу индивидуально под вас.',
    },
    {
      question: 'Какая длительность стандартного урока?',
      answer: 'Один урок длится 55 минут.',
    },
    {
      question: 'Преподаете ли вы другие языки?',
      answer: 'Да, я также преподаю английский язык. Если вас интересуют занятия по английскому, пожалуйста, напишите '
        + 'мне для уточнения деталей и наличия свободных мест.',
    },
    {
      question: 'Как происходит оплата уроков?',
      answer: 'Вы можете оплачивать занятия за 2 или 4 недели заранее переводом на карту. Когда оплаченные занятия '
        + 'заканчиваются, я вам напоминаю про оплату. Оплата принимается в рублях (Сбер, Тинькофф), тенге (Kaspi) '
        + 'и юанях (Alipay).',
    },
    {
      question: 'Можно ли отменить или перенести урок?',
      answer: 'Да, если вы не можете присутствовать на занятии, можно его отменить или перенести на другое удобное '
        + 'время, но прошу предупредить не позднее, чем за 24 часа. В противном случае урок считается проведенным.',
    },
    {
      question: 'Чем ваша консультация отличается от бесплатных вебинаров и консультаций у других специалистов?',
      answer: 'Это не общая информация, а глубокий, персонализированный разбор вашей конкретной ситуации, '
        + 'направленный на немедленное решение проблемы. Вы получите ключевые наработки моего восьмилетнего опыта '
        + 'преподавания, а также проверенные рабочие инструменты, которые я ежедневно использую на своих занятиях.',
    },
    {
      question: 'Вы помогаете только с методикой или с поиском клиентов тоже?',
      answer: 'На консультации мы разберем методики преподавания и материалы. Непосредственно студентов за вас я не '
        + 'ищу, но помогаю разобраться с ценообразованием, платформами по поиску студентов и позиционированием '
        + 'себя на рынке.',
    },
    {
      question: 'Есть ли гарантия результата после консультации?',
      answer: 'Я гарантирую предоставление проверенных, рабочих инструментов, которыми пользуюсь сама, и четкого '
        + 'плана. Конечный результат зависит от вашего внедрения этих стратегий.',
    },
    {
      question: 'Какая длительность консультации?',
      answer: 'Стандартная сессия – 60 минут. Если вы хотите более подробный разбор или у вас много вопросов, то '
        + 'доступен вариант более длинной консультации.',
    },
    {
      question: 'Нужно ли мне заранее присылать свои вопросы/учебный план?',
      answer: 'Да, чтобы наша сессия была максимально эффективной, прошу прислать свой запрос и материалы за 1–2 дня.',
    },
    {
      question: 'Ваша консультация подходит только для преподавателей китайского?',
      answer: 'Нет, консультация подойдет любому преподавателю иностранного языка, который работает онлайн. Методика '
        + 'преподавания, инструменты Zoom, планирование курса и ценообразование — это универсальные навыки. Если '
        + 'вы преподаете китайский или английский, я смогу дать больше конкретных материалов и примеров из своей '
        + 'практики.',
    },
  ];

  const calculateListHeight = useCallback(() => {
    const count = showAll ? faqData.length : Math.min(7, faqData.length);
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
        {faqData.length > 7 && (
          <FaqToggle>
            <ToggleButton type="button" onClick={toggleShowAll}>
              {showAll ? 'Свернуть список' : 'Показать все вопросы'}
              {showAll ? <ToggleIcon as={FaAnglesUp} /> : <ToggleIcon as={FaAnglesDown} />}
            </ToggleButton>
          </FaqToggle>
        )}
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
