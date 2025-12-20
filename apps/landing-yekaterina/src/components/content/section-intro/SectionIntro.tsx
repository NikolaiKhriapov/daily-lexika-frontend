import React, { useState } from 'react';
import { FaAngleDown } from 'react-icons/fa6';
import styled from 'styled-components';
import { Heading, Text } from '@library/shared/ui';
import { borderStyles, Breakpoint, FontWeight, Size, theme } from '@library/shared/utils';

export default function SectionIntro() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const qaItems = [
    {
      title: 'Образование и достижения',
      items: ['окончила бакалавриат на китайском языке', 'IELTS 7.5', 'HSK 5'],
    },
    {
      title: 'Опыт преподавания',
      items: [
        'английский язык — с 2017 года',
        'китайский язык — с 2023 года',
        'работаю со взрослыми и детьми, с нуля и до уверенного уровня',
      ],
    },
    {
      title: 'Методика',
      items: ['коммуникативный подход', 'упор на разговорную практику', 'индивидуальная адаптация программы'],
    },
    {
      title: 'Результаты студентов',
      items: [
        'свободное общение с иностранными коллегами',
        'переезд и учёба за границей',
        'успешное развитие карьерных и личных возможностей',
      ],
    },
  ];

  return (
    <Container>
      <IntroCard>
        <Text size={Size.MD} fontWeight={FontWeight.MEDIUM}>
          Меня зовут Катерина, я преподаватель английского и китайского языков.
        </Text>
        <Text size={Size.MD}>
          Живу в Китае с 2017 года, поэтому хорошо понимаю как особенности изучения языка, так и культурные нюансы.
        </Text>
      </IntroCard>
      <IntroLayout>
        <LeftColumn>
          <Accordion>
            {qaItems.map((card, index) => (
              <AccordionItem key={card.title}>
                <AccordionHeader onClick={() => setOpenIndex(openIndex === index ? null : index)}>
                  <Heading size={Size.MD}>{card.title}</Heading>
                  <AccordionIcon $isOpen={openIndex === index} />
                </AccordionHeader>
                <AccordionBody $isOpen={openIndex === index}>
                  <List>
                    {card.items.map((item) => (
                      <Text as="li" key={item} size={Size.SM}>
                        {item}
                      </Text>
                    ))}
                  </List>
                </AccordionBody>
              </AccordionItem>
            ))}
          </Accordion>
        </LeftColumn>
        <RightColumn>
          <VideoFrame>
            <iframe
              title="YouTube video player"
              src="https://www.youtube.com/embed/SjoNY306q1A?si=zNt9o0hZl46ItdKZ"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </VideoFrame>
        </RightColumn>
      </IntroLayout>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  max-width: 1280px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const IntroLayout = styled.div`
  width: 100%;
  display: flex;
  gap: 24px;
  align-items: flex-start;

  @media (max-width: ${Breakpoint.LG}) {
    flex-direction: column;
  }
`;

const LeftColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const RightColumn = styled.div`
  flex: 1;
  min-width: 320px;

  @media (max-width: ${Breakpoint.LG}) {
    width: 100%;
  }
`;

const IntroCard = styled.div`
  width: 100%;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  background-color: ${theme.colors.light.bgColor};
  border: ${borderStyles('light')};
  border-radius: 24px;
`;

const Accordion = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const AccordionItem = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${theme.colors.light.bgColor};
  border: ${borderStyles('light')};
  border-radius: 24px;
  padding: 18px 20px;
`;

const AccordionHeader = styled.button`
  border: none;
  background: transparent;
  list-style: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 0;
  text-align: left;

  &::-webkit-details-marker {
    display: none;
  }
`;

const AccordionIcon = styled(FaAngleDown)<{ $isOpen: boolean }>`
  width: 20px;
  height: 20px;
  color: ${theme.colors.textGrey};
  transform: ${({ $isOpen }) => ($isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
  transition: transform 0.5s ease;
`;

const AccordionBody = styled.div<{ $isOpen: boolean }>`
  margin-top: ${({ $isOpen }) => ($isOpen ? '12px' : '0')};
  overflow: hidden;
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  max-height: ${({ $isOpen }) => ($isOpen ? '500px' : '0')};
  transition: opacity 0.5s ease, max-height 0.5s ease, margin-top 0.5s ease;
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-left: 20px;
`;

const VideoFrame = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: 24px;
  overflow: hidden;

  iframe {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    border: 0;
  }
`;
