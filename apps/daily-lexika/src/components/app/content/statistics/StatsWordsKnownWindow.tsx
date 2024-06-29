import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useBreakpointValue } from '@chakra-ui/react';
import WordsScrollableContainer from '@daily-lexika/components/app/content/words/WordsScrollableContainer';
import { SkeletonType, SkeletonWrapper } from '@daily-lexika/components/ui/SkeletonWrapper';
import { useGetPageOfWordsByStatusQuery, wordsAPI } from '@daily-lexika/store/api/wordsAPI';
import { useAppDispatch } from '@daily-lexika/store/hooks/hooks';
import { Status } from '@library/daily-lexika';
import { Modal } from '@library/shared/ui';
import { Size } from '@library/shared/utils';

type Props = {
  isOpen: boolean;
  onClose: any;
};

const pageSize = 20;

export default function StatsWordsKnownWindow(props: Props) {
  const { isOpen, onClose } = props;

  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [page, setPage] = useState(0);
  const { data: pageResponse, isLoading: isLoadingWordsPage } = useGetPageOfWordsByStatusQuery({ status: Status.KNOWN, page, size: pageSize });

  dispatch(wordsAPI.util.prefetch('getPageOfWordsByStatus', { status: Status.KNOWN, page: page + 1, size: pageSize }, { force: true }));
  dispatch(wordsAPI.util.prefetch('getPageOfWordsByStatus', { status: Status.KNOWN, page: page + 2, size: pageSize }, { force: true }));

  return (
    <Modal
      size={Size.XXXL}
      width={useBreakpointValue({ base: '475px', md: 'min-content' })}
      isOpen={isOpen}
      onClose={onClose}
      header={t('StatsWordsKnownWindow.header')}
      body={(
        <SkeletonWrapper type={SkeletonType.WORDS_SCROLLABLE_CONTAINER} isLoading={isLoadingWordsPage}>
          {pageResponse && (
            <WordsScrollableContainer pageResponse={pageResponse} setPage={setPage} />
          )}
        </SkeletonWrapper>
      )}
    />
  );
}
