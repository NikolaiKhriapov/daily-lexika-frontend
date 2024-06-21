import React from 'react';
import { BsPlusSquareDotted } from 'react-icons/bs';
import styled from 'styled-components';
import { useColorMode, useDisclosure } from '@chakra-ui/react';
import CreateWordPackWindow from '@daily-lexika/components/app/content/word-pack/CreateWordPackWindow';
import { Card } from '@library/shared/ui';
import { theme } from '@library/shared/utils';

export default function WordPackCardAddNew() {
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Container onClick={onOpen}>
      <Card
        face={<BsPlusSquareDotted size={50} />}
        back={null}
        height="280px"
        width="215px"
        padding="0 25px"
        bgColor={theme.colors[colorMode].cardAddNew}
        isFlipped={false}
        setFlipped={() => null}
      />
      {isOpen && (
        <CreateWordPackWindow
          isOpen={isOpen}
          onClose={onClose}
        />
      )}
    </Container>
  );
}

const Container = styled.div`
`;
