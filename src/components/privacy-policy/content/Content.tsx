import React from 'react';
import styled from 'styled-components';
import SectionContent from '@components/privacy-policy/content/section-content/SectionContent';
import SectionHeading from '@components/privacy-policy/content/section-heading/SectionHeading';

export default function Content() {
  return (
    <Container>
      <SectionHeading />
      <SectionContent />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  margin: 0 auto;
`;
