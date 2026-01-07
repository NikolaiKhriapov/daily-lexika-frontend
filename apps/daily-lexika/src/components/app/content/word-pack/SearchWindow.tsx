import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { ColorMode, useBreakpointValue, useColorMode } from '@chakra-ui/react';
import WordDataHelper from '@daily-lexika/helpers/WordDataHelper';
import { useGetUserQuery } from '@daily-lexika/store/api/userAPI';
import {
  useAddCustomWordPackToWordDataByWordPackNameMutation,
  useAddCustomWordPackToWordDataMutation,
  useRemoveCustomWordPackFromWordDataMutation,
  useSearchWordDataQuery,
  wordDataAPI,
} from '@daily-lexika/store/api/wordDataAPI';
import {
  useGetAllWordPacksQuery,
} from '@daily-lexika/store/api/wordPacksAPI';
import { useAppDispatch } from '@daily-lexika/store/hooks/hooks';
import { Category, WordDataDto, WordPackDto } from '@library/daily-lexika';
import { errorNotification, successNotification } from '@library/shared/services';
import { ButtonWithIcon, ButtonWithIconType, Modal, SearchInput, Spinner, Text } from '@library/shared/ui';
import { borderStyles, Breakpoint, FontWeight, mediaBreakpointUp, Size, theme, useDebouncedValue } from '@library/shared/utils';

type Props = {
  isOpen: boolean;
  onClose: any;
  wordPack: WordPackDto;
};

export default function SearchWindow(props: Props) {
  const { isOpen, onClose, wordPack } = props;

  const { colorMode } = useColorMode();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { data: user } = useGetUserQuery();
  const { data: allWordPacks = [] } = useGetAllWordPacksQuery();
  const [addCustomWordPackToWordData] = useAddCustomWordPackToWordDataMutation();
  const [removeCustomWordPackFromWordData] = useRemoveCustomWordPackFromWordDataMutation();
  const [addCustomWordPackToWordDataByWordPackName, { isLoading: isLoadingAddAllWords }] = useAddCustomWordPackToWordDataByWordPackNameMutation();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isDisabled, setDisabled] = useState<number | null>(null);
  const [isOpenAddOrRemoveWord, setOpenAddOrRemoveWord] = useState<number | null>(null);
  const [valueLoading, setValueLoading] = useState<string>('');

  const modalWidth = useBreakpointValue({ base: '450px', md: 'auto' });

  const SEARCH_LIMIT = 100;
  const SEARCH_DEBOUNCE_MS = 300;

  const trimmedQuery = searchQuery.trim();
  const debouncedQuery = useDebouncedValue(trimmedQuery, SEARCH_DEBOUNCE_MS);
  const shouldSkipSearch = debouncedQuery.length < 1;
  const isDebouncing = trimmedQuery.length > 0 && trimmedQuery !== debouncedQuery;
  const { data: searchResult = [], isFetching: isSearching } = useSearchWordDataQuery(
    { query: debouncedQuery, limit: SEARCH_LIMIT },
    { skip: shouldSkipSearch },
  );

  const updateSearchCache = (updatedWordData: WordDataDto, query: string) => {
    if (query.length < 1) return;
    dispatch(wordDataAPI.util.updateQueryData('searchWordData', { query, limit: SEARCH_LIMIT }, (draft) => {
      const wordData = draft?.find((item) => item.id === updatedWordData.id);
      if (wordData) {
        Object.assign(wordData, updatedWordData);
      }
    }));
  };

  const handleAddCustomWordPackToWordData = (wordDataDto: WordDataDto) => {
    setDisabled(wordDataDto.id);
    setOpenAddOrRemoveWord(null);
    addCustomWordPackToWordData({ wordPackName: wordPack.name, wordDataId: wordDataDto.id })
      .unwrap()
      .then((updatedWordData) => {
        updateSearchCache(updatedWordData, debouncedQuery);
        successNotification(t('SearchWindow.successMessage.addWord'));
      })
      .catch((error) => errorNotification('', error))
      .finally(() => setDisabled(null));
  };

  const handleRemoveCustomWordPackFromWordData = (wordDataDTO: WordDataDto) => {
    setDisabled(wordDataDTO.id);
    setOpenAddOrRemoveWord(null);
    removeCustomWordPackFromWordData({ wordPackName: wordPack.name, wordDataId: wordDataDTO.id })
      .unwrap()
      .then((updatedWordData) => {
        updateSearchCache(updatedWordData, debouncedQuery);
        successNotification(t('SearchWindow.successMessage.removeWord'));
      })
      .catch((error) => errorNotification('', error))
      .finally(() => setDisabled(null));
  };

  const isWordAlreadyAddedToWordPack = (wordData: WordDataDto) =>
    wordData.listOfWordPackNames.includes(wordPack.name);

  const onClickWordData = (wordDataId: number) => {
    if (isDisabled !== wordDataId) {
      setOpenAddOrRemoveWord(wordDataId);
    }
  };

  const onClickAddCustomWordPackToWordDataByWordPackName = (wordPackName: string) => {
    setValueLoading(wordPackName);
    addCustomWordPackToWordDataByWordPackName({ wordPackNameTo: wordPack.name, wordPackNameFrom: wordPackName })
      .unwrap()
      .then(() => setValueLoading(''));
  };

  if (!user) return <Spinner />;

  return (
    <Modal
      width={modalWidth}
      isOpen={isOpen}
      onClose={onClose}
      header={t('SearchWindow.header')}
      body={(
        <Container>
          <SearchInput
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            isLoading={isSearching || isDebouncing}
          />
          <WordInfoContainer>
            {
              trimmedQuery.length < 1
                ? (
                  <>
                    <Text fontWeight={FontWeight.MEDIUM} isCentered opacity="50%" style={{ width: '90%' }}>
                      {WordDataHelper.getSearchInfoText(user, t)}
                    </Text>
                    <WordPackNameBadges>
                      {
                        allWordPacks
                          .filter((oneWordPack) => [Category.CEFR, Category.HSK].includes(oneWordPack.category))
                          .map((oneWordPack) => (
                            <WordPackNameBadge
                              key={oneWordPack.name}
                              $colorMode={colorMode}
                              onClick={() => onClickAddCustomWordPackToWordDataByWordPackName(oneWordPack.name)}
                            >
                              {t('SearchWindow.addAllWordsFromWordPackButton')} {WordDataHelper.getOriginalWordPackName(oneWordPack.name, user)}
                              {isLoadingAddAllWords && valueLoading === oneWordPack.name && <Spinner size={Size.SM} />}
                            </WordPackNameBadge>
                          ))
                      }
                    </WordPackNameBadges>
                  </>
                )
                : (
                  searchResult && searchResult.map((wordDataDto) => (
                    <WordInfo
                      key={wordDataDto.id}
                      onClick={() => onClickWordData(wordDataDto.id)}
                      $colorMode={colorMode}
                      $isWordAdded={isWordAlreadyAddedToWordPack(wordDataDto)}
                    >
                      <CharacterAndTranscriptionAndTranslation>
                        <Text>{WordDataHelper.getWordDataNameByUserRole(wordDataDto, user!)}&nbsp;&nbsp;{wordDataDto.transcription}</Text>
                        <Text size={{
                          base: Size.SM,
                          md: Size.MD,
                          xl: Size.MD,
                        }}>{WordDataHelper.getWordDataTranslationWithoutDuplicate(wordDataDto, user!)}</Text>
                      </CharacterAndTranscriptionAndTranslation>
                      <RightIconContainer
                        $isShown={isOpenAddOrRemoveWord === wordDataDto.id}
                        $isDisabled={isDisabled === wordDataDto.id}
                      >
                        {!isWordAlreadyAddedToWordPack(wordDataDto) && (
                          <ButtonWithIcon
                            type={ButtonWithIconType.ADD_WORD}
                            onClick={() => handleAddCustomWordPackToWordData(wordDataDto)}
                            isDisabled={isDisabled === wordDataDto.id}
                          />
                        )}
                        {isWordAlreadyAddedToWordPack(wordDataDto) && (
                          <ButtonWithIcon
                            type={ButtonWithIconType.REMOVE_WORD}
                            onClick={() => handleRemoveCustomWordPackFromWordData(wordDataDto)}
                            isDisabled={isDisabled === wordDataDto.id}
                          />
                        )}
                      </RightIconContainer>
                    </WordInfo>
                  ))
                )
            }
          </WordInfoContainer>
        </Container>
      )}
    />
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 500px;
`;

const WordInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  height: 70vh;
  align-items: center;
  overflow-x: hidden;
  width: 100%;

  ${mediaBreakpointUp(Breakpoint.TABLET)} {
    height: 60vh;
  }
`;

const WordPackNameBadges = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  padding: 10px;
`;

const WordPackNameBadge = styled.div<{ $colorMode: ColorMode }>`
  display: flex;
  gap: 7px;
  padding: 6px 10px;
  border: ${({ $colorMode }) => borderStyles($colorMode)};
  border-radius: ${theme.stylesToDelete.borderRadius};
  cursor: pointer;

  background-color: ${({ $colorMode }) => theme.colors[$colorMode].hoverBgColor};

  &:hover {
    background-color: ${({ $colorMode }) => theme.colors[$colorMode].buttonHoverBgColor};
  }
`;

const WordInfo = styled.div<{ $colorMode: ColorMode; $isWordAdded: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  border: ${({ $colorMode }) => borderStyles($colorMode)};
  border-radius: ${theme.stylesToDelete.borderRadius};
  cursor: pointer;
  background-color: ${({ $isWordAdded, $colorMode }) => $isWordAdded && theme.colors[$colorMode].hoverBgColor};

  &:hover {
    background-color: ${({ $colorMode }) => theme.colors[$colorMode].hoverBgColor};
  }

  ${mediaBreakpointUp(Breakpoint.TABLET)} {
    width: 500px;
  }
`;

const RightIconContainer = styled.div<{ $isShown: boolean; $isDisabled: boolean }>`
  justify-content: center;
  width: ${({ $isShown, $isDisabled }) => ($isShown && $isDisabled ? '60px' : '0')};
  transition: width 0.3s ease;

  ${WordInfo}:hover & {
    width: 60px;
  }
`;

const CharacterAndTranscriptionAndTranslation = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 10px;
  width: 100%;
`;
