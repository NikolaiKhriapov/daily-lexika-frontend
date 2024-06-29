import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { CopyIcon } from '@chakra-ui/icons';
import { Spinner, useBreakpointValue } from '@chakra-ui/react';
import WordsScrollableContainer from '@daily-lexika/components/app/content/words/WordsScrollableContainer';
import { SkeletonType, SkeletonWrapper } from '@daily-lexika/components/ui/SkeletonWrapper';
import I18nHelper from '@daily-lexika/helpers/I18nHelper';
import WordPackHelper from '@daily-lexika/helpers/WordPackHelper';
import { useGetUserQuery } from '@daily-lexika/store/api/userAPI';
import { useGetPageOfWordsForWordPackQuery, wordPacksAPI } from '@daily-lexika/store/api/wordPacksAPI';
import { useAppDispatch } from '@daily-lexika/store/hooks/hooks';
import { WordPackDto } from '@library/daily-lexika';
import { Modal, Text } from '@library/shared/ui';
import { Breakpoint, mediaBreakpointUp,Size } from '@library/shared/utils';

type Props = {
  isOpen: boolean;
  onClose: any;
  wordPack: WordPackDto;
};

const pageSize = 20;

export default function ReviewWordPackWindow(props: Props) {
  const { isOpen, onClose, wordPack } = props;

  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { data: user } = useGetUserQuery();
  const [page, setPage] = useState(0);
  const { data: pageResponse, isLoading: isLoadingPageResponse } = useGetPageOfWordsForWordPackQuery({ wordPackName: wordPack.name, page, size: pageSize });

  dispatch(wordPacksAPI.util.prefetch('getPageOfWordsForWordPack', { wordPackName: wordPack.name, page: page + 1, size: pageSize }, { force: false }));
  dispatch(wordPacksAPI.util.prefetch('getPageOfWordsForWordPack', { wordPackName: wordPack.name, page: page + 2, size: pageSize }, { force: false }));

  const modalWidth = useBreakpointValue({ base: '475px', md: 'min-content' });

  if (!user) return <Spinner />;

  return (
    <Modal
      size={Size.XXXL}
      width={modalWidth}
      isOpen={isOpen}
      onClose={onClose}
      header={I18nHelper.getWordPackNameTranslated(wordPack.name, user, t)}
      body={(
        <Container>
          <TotalWords>
            <CopyIcon />
            <Text>{wordPack.wordsTotal}</Text>
          </TotalWords>
          <Text size={{ base: Size.SM, md: Size.MD, xl: Size.MD }}>{WordPackHelper.getDescriptionForLanguage(wordPack, user)}</Text>
          <SkeletonWrapper type={SkeletonType.WORDS_SCROLLABLE_CONTAINER} isLoading={isLoadingPageResponse}>
            {pageResponse && (
              <WordsScrollableContainer pageResponse={pageResponse} setPage={setPage} />
            )}
          </SkeletonWrapper>
        </Container>
      )}
    />
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  ${mediaBreakpointUp(Breakpoint.TABLET)} {
    width: 500px;
  }
`;

const TotalWords = styled.div`
  display: flex;
  flex-direction: row;
  gap: 4px;
  align-items: center;
`;
