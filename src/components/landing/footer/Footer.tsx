import React from 'react';
import styled from 'styled-components';
import { theme } from '@utils/theme';

export default function Footer() {
  return (
    <Container />
  );
}

const Container = styled.div`
  width: 100%;
  height: 200px;
  background-color: ${theme.colors.dark.bgColor};
`;
