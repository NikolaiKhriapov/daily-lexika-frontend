import React from 'react';
import { Link } from 'react-scroll';
import styled from 'styled-components';
import { SectionId } from '@landing-yekaterina/utils/constants';
import { Text } from '@library/shared/ui';
import { FontWeight } from '@library/shared/utils';

export default function Navbar() {
  const sectionLinkMapping = [
    {
      id: SectionId.INTRO,
      text: 'Обо мне',
    },
    {
      id: SectionId.DEMO_CLASS,
      text: 'Пробное занятие',
    },
    {
      id: SectionId.CONSULTATION,
      text: 'Консультации для преподавателей',
    },
    {
      id: SectionId.FEEDBACK,
      text: 'Отзывы',
    },
    {
      id: SectionId.DISCOUNTS,
      text: 'Скидки',
    },
    {
      id: SectionId.FAQ,
      text: 'FAQ',
    },
  ];

  return (
    <Container>
      {sectionLinkMapping.map((sectionLink) => (
        <SectionLink key={sectionLink.id} to={sectionLink.id} smooth duration={500}>
          <Text fontWeight={FontWeight.SEMIBOLD}>{sectionLink.text}</Text>
        </SectionLink>
      ))}
    </Container>
  );
}

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 70px;
  background-color: white;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  gap: 20px;
`;

const SectionLink = styled(Link)`
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 10px;
  cursor: pointer;
`;
