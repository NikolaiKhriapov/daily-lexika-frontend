import React from 'react';
import styled from 'styled-components';

type Props = {
  children: React.ReactNode;
  alignRight?: boolean;
};

export default function ButtonsContainer(props: Props) {
  const { children, alignRight = false } = props;

  return (
    <Component $alignRight={alignRight}>
      {children}
    </Component>
  );
}

const Component = styled.div<{ $alignRight: boolean }>`
  display: flex;
  justify-content: ${({ $alignRight }) => ($alignRight ? 'right' : 'center')};
  gap: 22px;
`;
