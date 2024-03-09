import React, { useState } from 'react';
import { useBreakpointValue } from '@chakra-ui/react';
import { useGetAllWordsByStatusQuery, wordsAPI } from '@store/api/wordsAPI';
import { useAppDispatch } from '@store/hooks/hooks';
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

  const dispatch = useAppDispatch();
  const [page, setPage] = useState(0);
  const pageSize = 20;

  dispatch(wordsAPI.util.prefetch('getAllWordsByStatus', { status: Status.KNOWN, page: page + 1, size: pageSize }, { force: true }));
  dispatch(wordsAPI.util.prefetch('getAllWordsByStatus', { status: Status.KNOWN, page: page + 2, size: pageSize }, { force: true }));

  const {
    data: wordsPage = [],
    isLoading: isLoadingGetAllWordsByStatus,
  } = useGetAllWordsByStatusQuery({ status: Status.KNOWN, page, size: pageSize });

  return (
    <Modal
      size={Size.XXXL}
      width={useBreakpointValue({ base: '475px', md: 'auto' })}
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
