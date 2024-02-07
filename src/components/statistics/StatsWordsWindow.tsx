import React, { useEffect, useState } from 'react';
import { getAllWordsByStatus } from '@services/words';
import { Size } from '@utils/constants';
import { Status, WordDTO } from '@utils/types';
import Modal from '@components/common/complex/Modal';
import WordsScrollableContainer from '@components/words/WordsScrollableContainer';

type Props = {
  isOpen: boolean;
  onClose: any;
};

export default function StatsWordsWindow(props: Props) {
  const { isOpen, onClose } = props;

  const [visibleWords, setVisibleWords] = useState<WordDTO[]>([]);
  const [page, setPage] = useState(0);
  const pageSize = 20;
  const [isWordInfoLoading, setWordInfoLoading] = useState(false);

  const fetchAllKnownWords = () => {
    setWordInfoLoading(true);
    getAllWordsByStatus(Status.KNOWN, page, pageSize)
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
    fetchAllKnownWords();
  }, []);
  
  return (
    <Modal
      size={Size.XXXL}
      isOpen={isOpen}
      onClose={onClose}
      header='Words Known'
      body={(
        <WordsScrollableContainer
          words={visibleWords}
          isLoading={isWordInfoLoading}
          page={page}
          setPage={setPage}
        />
      )}
    />
  );
}
