import React from 'react';
import { GoPlus } from 'react-icons/go';
import styled from 'styled-components';
import { useColorMode } from '@chakra-ui/react';
import { Card } from '@library/shared/ui';
import { theme } from '@library/shared/utils';

export default function AccountCardNew() {
  const { colorMode } = useColorMode();

  return (
    <Card
      height="70px"
      width="450px"
      padding="0 25px"
      bgColor={theme.colors[colorMode].borderColorMain}
      face={(
        <ContentsContainer>
          <GoPlus size={50} />
        </ContentsContainer>
      )}
    />
  );
}

const ContentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
