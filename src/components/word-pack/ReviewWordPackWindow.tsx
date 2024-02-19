import React, { useState } from 'react';
import styled from 'styled-components';
import { CopyIcon } from '@chakra-ui/icons';
import { Spinner } from '@chakra-ui/react';
import { useGetUserInfoQuery } from '@store/api/userAPI';
import { useGetAllWordsForWordPackQuery } from '@store/api/wordPacksAPI';
import { Size } from '@utils/constants';
import { getOriginalWordPackName } from '@utils/functions';
import { WordPackDTO } from '@utils/types';
import Text from '@components/common/basic/Text';
import Modal from '@components/common/complex/Modal';
import WordsScrollableContainer from '@components/words/WordsScrollableContainer';

type Props = {
  isOpen: boolean;
  onClose: any;
  wordPackDTO: WordPackDTO;
};

export default function ReviewWordPackWindow(props: Props) {
  const { isOpen, onClose, wordPackDTO } = props;

  const [page, setPage] = useState(0);
  const pageSize = 20;

  const { data: user } = useGetUserInfoQuery();

  const {
    data: wordsPage = [],
    isLoading: isLoadingGetAllWordsForWordPack,
  } = useGetAllWordsForWordPackQuery({ wordPackName: wordPackDTO.name, page, size: pageSize });

  if (!user) return <Spinner />;

  return (
    <Modal
      size={Size.XXXL}
      isOpen={isOpen}
      onClose={onClose}
      header={getOriginalWordPackName(wordPackDTO.name, user)}
      body={(
        <Container>
          <TotalWords>
            <CopyIcon />
            <Text>{wordPackDTO.totalWords}</Text>
          </TotalWords>
          <Text size={{ base: Size.SM, md: Size.MD, xl: Size.MD }}>{wordPackDTO.description}</Text>
          <WordsScrollableContainer
            wordsPage={wordsPage}
            isLoading={isLoadingGetAllWordsForWordPack}
            page={page}
            setPage={setPage}
          />
        </Container>
      )}
    />
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const TotalWords = styled.div`
  display: flex;
  flex-direction: row;
  gap: 4px;
  align-items: center;
`;
