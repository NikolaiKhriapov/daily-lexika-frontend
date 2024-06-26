import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { Link } from '@library/shared/ui';
import { theme } from '@library/shared/utils';

type MessengerIconLinkProps = {
  order: number;
  href: string;
  icon: ReactNode;
  isVisible: boolean;
};

export default function MessengerIconLink(props: MessengerIconLinkProps) {
  const { href, icon, order, isVisible } = props;

  const height = `${15 + (70 * order)}px`;

  return (
    <Container $height={height} $isVisible={isVisible}>
      <Link href={href} target="_blank" rel="noopener noreferrer">
        <Circle>{icon}</Circle>
      </Link>
    </Container>
  );
}

const Container = styled.div<{ $height: string; $isVisible: boolean }>`
  position: absolute;
  bottom: ${({ $height, $isVisible }) => ($isVisible ? $height : '0')};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  height: 60px;
  width: 60px;
  border-radius: 30px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  transition: bottom ease 0.3s;
`;

const Circle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  width: 60px;
  border-radius: 30px;
  background-color: ${theme.colors.white};
`;
