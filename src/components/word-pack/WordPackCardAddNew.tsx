import React from 'react';
import { BsPlusSquareDotted } from 'react-icons/bs';
import styled from 'styled-components';
import { useColorMode, useDisclosure } from '@chakra-ui/react';
import { theme } from '@utils/theme';
import Card from '@components/common/complex/Card';
import CreateWordPackWindow from '@components/word-pack/CreateWordPackWindow';

type Props = {
  setReload: any,
};

export default function WordPackCardAddNew(props: Props) {
  const { setReload } = props;

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
          setReload={setReload}
        />
      )}
    </Container>
  );
}

const Container = styled.div`
`;
