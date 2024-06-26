import React from 'react';
import styled from 'styled-components';

import { ButtonWithIcon, ButtonWithIconType } from '../basic/ButtonWithIcon';

interface Props {
  refetch: () => void;
}

export function TableFilters(props: Props) {
  const { refetch } = props;

  return (
    <Container>
      <ButtonWithIcon
        type={ButtonWithIconType.REFRESH}
        onClick={refetch}
      />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
`;
