import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { CopyIcon } from '@chakra-ui/icons';
import { getAllWordsForWordPack } from '@services/word-packs';
import { Size } from '@utils/constants';
import { WordDTO, WordPackDTO } from '@utils/types';
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

  const [visibleWords, setVisibleWords] = useState<WordDTO[]>([]);
  const [page, setPage] = useState(0);
  const pageSize = 20;
  const [isWordInfoLoading, setWordInfoLoading] = useState(false);

  const fetchAllWordsForWordPack = () => {
    setWordInfoLoading(true);
    getAllWordsForWordPack(wordPackDTO.name, page, pageSize)
      .then((response) => {
        const { data } = response;
        setVisibleWords((prevData) => {
          if (page === 0) {
            return data;
          }
          return [...prevData, ...data];
        });
      })
      .catch((error) => console.error(error.code, error.response.data.message))
      .finally(() => setWordInfoLoading(false));
  };

  useEffect(() => {
    fetchAllWordsForWordPack();
  }, [wordPackDTO?.name, page, pageSize]);

  return (
    <Modal
      size={Size.XXXL}
      isOpen={isOpen}
      onClose={onClose}
      header={wordPackDTO?.name}
      body={(
        <Container>
          <TotalWords>
            <CopyIcon />
            <Text>{wordPackDTO?.totalWords}</Text>
          </TotalWords>
          <Text size={{ base: Size.SM, md: Size.MD, xl: Size.MD }}>{wordPackDTO?.description}</Text>
          <WordsScrollableContainer
            words={visibleWords}
            isLoading={isWordInfoLoading}
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
