import React from 'react';
import styled from 'styled-components';

type Props = {
  children: React.ReactNode;
};

export default function ButtonsContainer(props: Props) {
  const { children } = props;

  return (
    <Component>
      {children}
    </Component>
  );
}

const Component = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
`;
