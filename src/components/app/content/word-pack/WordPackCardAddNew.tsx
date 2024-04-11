import React from 'react';
import { BsPlusSquareDotted } from 'react-icons/bs';
import styled from 'styled-components';
import { useColorMode, useDisclosure } from '@chakra-ui/react';
import { theme } from '@utils/theme';
import CreateWordPackWindow from '@components/app/content/word-pack/CreateWordPackWindow';
import Card from '@components/ui-common/complex/Card';

export default function WordPackCardAddNew() {
  const { colorMode } = useColorMode();
  const { isOpen: isOpenCreateButton, onOpen: onOpenCreateButton, onClose: onCloseCreateButton } = useDisclosure();

  return (
    <Container onClick={onOpenCreateButton}>
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
      {isOpenCreateButton && (
        <CreateWordPackWindow
          isOpen={isOpenCreateButton}
          onClose={onCloseCreateButton}
        />
      )}
    </Container>
  );
}

const Container = styled.div`
`;
