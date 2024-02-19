import React, { useState } from 'react';
import { useGetAllWordsByStatusQuery } from '@store/api/wordsAPI';
import { Size } from '@utils/constants';
import { Status } from '@utils/types';
import Modal from '@components/common/complex/Modal';
import WordsScrollableContainer from '@components/words/WordsScrollableContainer';

type Props = {
  isOpen: boolean;
  onClose: any;
};

export default function StatsWordsWindow(props: Props) {
  const { isOpen, onClose } = props;

  const [page, setPage] = useState(0);
  const pageSize = 20;

  const {
    data: wordsPage = [],
    isLoading: isLoadingGetAllWordsByStatus,
  } = useGetAllWordsByStatusQuery({ status: Status.KNOWN, page, size: pageSize });

  return (
    <Modal
      size={Size.XXXL}
      isOpen={isOpen}
      onClose={onClose}
      header='Words Known'
      body={(
        <WordsScrollableContainer
          wordsPage={wordsPage}
          isLoading={isLoadingGetAllWordsByStatus}
          page={page}
          setPage={setPage}
        />
      )}
    />
  );
}
