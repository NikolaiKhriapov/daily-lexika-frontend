import React, { useState } from 'react';
import styled from 'styled-components';
import { CopyIcon } from '@chakra-ui/icons';
import { Spinner, useBreakpointValue } from '@chakra-ui/react';
import { useGetUserInfoQuery } from '@store/api/userAPI';
import { useGetAllWordsForWordPackQuery, wordPacksAPI } from '@store/api/wordPacksAPI';
import { useAppDispatch } from '@store/hooks/hooks';
import { Size } from '@utils/constants';
import { getOriginalWordPackName } from '@utils/functions';
import { WordPackDto } from '@utils/types';
import Text from '@components/common/basic/Text';
import Modal from '@components/common/complex/Modal';
import WordsScrollableContainer from '@components/words/WordsScrollableContainer';

type Props = {
  isOpen: boolean;
  onClose: any;
  wordPack: WordPackDto;
};

export default function ReviewWordPackWindow(props: Props) {
  const { isOpen, onClose, wordPack } = props;

  const dispatch = useAppDispatch();
  const [page, setPage] = useState(0);
  const pageSize = 20;
  const modalWidth = useBreakpointValue({ base: '475px', md: 'min-content' });

  const { data: user } = useGetUserInfoQuery();
  const { data: wordsPage = [], isLoading } = useGetAllWordsForWordPackQuery({ wordPackName: wordPack.name, page, size: pageSize });
  dispatch(wordPacksAPI.util.prefetch('getAllWordsForWordPack', { wordPackName: wordPack.name, page: page + 1, size: pageSize }, { force: false }));
  dispatch(wordPacksAPI.util.prefetch('getAllWordsForWordPack', { wordPackName: wordPack.name, page: page + 2, size: pageSize }, { force: false }));

  if (!user) return <Spinner />;

  return (
    <Modal
      size={Size.XXXL}
      width={modalWidth}
      isOpen={isOpen}
      onClose={onClose}
      header={getOriginalWordPackName(wordPack.name, user)}
      body={(
        <Container>
          <TotalWords>
            <CopyIcon />
            <Text>{wordPack.totalWords}</Text>
          </TotalWords>
          <Text size={{ base: Size.SM, md: Size.MD, xl: Size.MD }}>{wordPack.description}</Text>
          <WordsScrollableContainer
            wordsPage={wordsPage}
            isLoading={isLoading}
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
