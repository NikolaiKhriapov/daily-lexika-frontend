import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useBreakpointValue } from '@chakra-ui/react';
import { useGetAllWordsByStatusQuery, wordsAPI } from '@store/api/wordsAPI';
import { useAppDispatch } from '@store/hooks/hooks';
import { Size } from '@utils/constants';
import { Status } from '@utils/types';
import WordsScrollableContainer from '@components/app/content/words/WordsScrollableContainer';
import Modal from '@components/ui-common/complex/Modal';
import SkeletonWrapper, { SkeletonType } from '@components/ui-common/complex/SkeletonWrapper';

type Props = {
  isOpen: boolean;
  onClose: any;
};

export default function StatsWordsKnownWindow(props: Props) {
  const { isOpen, onClose } = props;

  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [page, setPage] = useState(0);

  const pageSize = 20;

  dispatch(wordsAPI.util.prefetch('getAllWordsByStatus', { status: Status.KNOWN, page: page + 1, size: pageSize }, { force: true }));
  dispatch(wordsAPI.util.prefetch('getAllWordsByStatus', { status: Status.KNOWN, page: page + 2, size: pageSize }, { force: true }));

  const {
    data: wordsPage = [],
    isLoading: isLoadingWordsPage,
  } = useGetAllWordsByStatusQuery({ status: Status.KNOWN, page, size: pageSize });

  return (
    <Modal
      size={Size.XXXL}
      width={useBreakpointValue({ base: '475px', md: 'min-content' })}
      isOpen={isOpen}
      onClose={onClose}
      header={t('StatsWordsKnownWindow.header')}
      body={(
        <SkeletonWrapper type={SkeletonType.WORDS_SCROLLABLE_CONTAINER} isLoading={isLoadingWordsPage}>
          <WordsScrollableContainer
            wordsPage={wordsPage}
            isLoading={isLoadingWordsPage}
            page={page}
            setPage={setPage}
          />
        </SkeletonWrapper>
      )}
    />
  );
}
