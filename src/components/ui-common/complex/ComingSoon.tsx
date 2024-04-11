import React from 'react';
import styled from 'styled-components';
import { FontWeight } from '@utils/constants';
import Text from '@components/ui-common/basic/Text';

export default function ComingSoon() {
  return (
    <Container>
      <Text fontWeight={FontWeight.SEMIBOLD} isCentered>Coming soon</Text>
    </Container>
  );
}

const Container = styled.div`
  opacity: 50%;
`;
