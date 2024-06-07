import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { CopyIcon } from '@chakra-ui/icons';
import { Spinner, useBreakpointValue } from '@chakra-ui/react';
import { useGetUserInfoQuery } from '@store/api/userAPI';
import { useGetAllWordsForWordPackQuery, wordPacksAPI } from '@store/api/wordPacksAPI';
import { useAppDispatch } from '@store/hooks/hooks';
import { Breakpoint, Size } from '@utils/constants';
import { mediaBreakpointUp } from '@utils/functions';
import { WordPackDto } from '@utils/types';
import WordsScrollableContainer from '@components/app/content/words/WordsScrollableContainer';
import Text from '@components/ui-common/basic/Text';
import Modal from '@components/ui-common/complex/Modal';
import SkeletonWrapper, { SkeletonType } from '@components/ui-common/complex/SkeletonWrapper';
import I18nHelper from '@helpers/I18nHelper';
import WordPackHelper from '@helpers/WordPackHelper';

type Props = {
  isOpen: boolean;
  onClose: any;
  wordPack: WordPackDto;
};

export default function ReviewWordPackWindow(props: Props) {
  const { isOpen, onClose, wordPack } = props;

  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { data: user } = useGetUserInfoQuery();
  const [page, setPage] = useState(0);

  const pageSize = 20;
  const modalWidth = useBreakpointValue({ base: '475px', md: 'min-content' });

  const { data: wordsPage = [], isLoading: isLoadingWordsPage } = useGetAllWordsForWordPackQuery({ wordPackName: wordPack.name, page, size: pageSize });
  dispatch(wordPacksAPI.util.prefetch('getAllWordsForWordPack', { wordPackName: wordPack.name, page: page + 1, size: pageSize }, { force: false }));
  dispatch(wordPacksAPI.util.prefetch('getAllWordsForWordPack', { wordPackName: wordPack.name, page: page + 2, size: pageSize }, { force: false }));

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
            <Text>{wordPack.totalWords}</Text>
          </TotalWords>
          <Text size={{ base: Size.SM, md: Size.MD, xl: Size.MD }}>{WordPackHelper.getDescriptionForLanguage(wordPack, user)}</Text>
          <SkeletonWrapper type={SkeletonType.WORDS_SCROLLABLE_CONTAINER} isLoading={isLoadingWordsPage}>
            <WordsScrollableContainer
              wordsPage={wordsPage}
              isLoading={isLoadingWordsPage}
              page={page}
              setPage={setPage}
            />
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
