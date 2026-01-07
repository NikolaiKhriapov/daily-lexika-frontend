import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { ColorMode, useColorMode, useDisclosure } from '@chakra-ui/react';
import WordDetailedInfoDrawer from '@daily-lexika/components/app/content/words/WordDetailedInfoDrawer';
import WordDataHelper from '@daily-lexika/helpers/WordDataHelper';
import { useGetUserQuery } from '@daily-lexika/store/api/userAPI';
import { useSearchWordDataQuery } from '@daily-lexika/store/api/wordDataAPI';
import { SearchInput, Spinner, Text } from '@library/shared/ui';
import { borderStyles, Breakpoint, FontWeight, mediaBreakpointUp, Size, theme, useDebouncedValue } from '@library/shared/utils';

export default function SearchPageContent() {
  const { colorMode } = useColorMode();
  const { t } = useTranslation();
  const { data: user } = useGetUserQuery();
  const { isOpen: isOpenDetails, onOpen: onOpenDetails, onClose: onCloseDetails } = useDisclosure();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedWordDataId, setSelectedWordDataId] = useState<number>();

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

  const shouldShowPlaceholder = trimmedQuery.length < 1;

  const onClickWordData = (wordDataId: number) => {
    setSelectedWordDataId(wordDataId);
    onOpenDetails();
  };

  if (!user) return <Spinner />;

  return (
    <Container>
      <SearchInput
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        isLoading={isSearching || isDebouncing}
      />
      <WordInfoContainer>
        {
          shouldShowPlaceholder
            ? (
              <Text fontWeight={FontWeight.MEDIUM} isCentered opacity='50%' style={{ width: '90%' }}>
                {WordDataHelper.getSearchInfoText(user, t)}
              </Text>
            )
            : (
              searchResult.map((wordDataDto) => (
                <WordInfo
                  key={wordDataDto.id}
                  onClick={() => onClickWordData(wordDataDto.id)}
                  $colorMode={colorMode}
                >
                  <CharacterAndTranscriptionAndTranslation>
                    <Text>{WordDataHelper.getWordDataNameByUserRole(wordDataDto, user!)}&nbsp;&nbsp;{wordDataDto.transcription}</Text>
                    <Text size={{ base: Size.SM, md: Size.MD, xl: Size.MD }}>{WordDataHelper.getWordDataTranslationWithoutDuplicate(wordDataDto, user!)}</Text>
                  </CharacterAndTranscriptionAndTranslation>
                  {isOpenDetails && (
                    <WordDetailedInfoDrawer
                      isOpen={isOpenDetails && wordDataDto.id === selectedWordDataId}
                      onClose={onCloseDetails}
                      wordData={wordDataDto}
                      selectedWordDataId={selectedWordDataId}
                    />
                  )}
                </WordInfo>
              ))
            )
        }
      </WordInfoContainer>
    </Container>
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
  align-items: center;
  gap: 5px;
  width: 100%;

  ${mediaBreakpointUp(Breakpoint.DESKTOP)} {
    overflow-y: scroll;
    height: calc(100vh - 170px - 170px);
  }
`;

const WordInfo = styled.div<{ $colorMode: ColorMode }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  border: ${({ $colorMode }) => borderStyles($colorMode)};
  border-radius: ${theme.stylesToDelete.borderRadius};
  cursor: pointer;

  &:hover {
    background-color: ${({ $colorMode }) => theme.colors[$colorMode].bgColor};
  }

  ${mediaBreakpointUp(Breakpoint.TABLET)} {
    width: 500px;
  }
`;

const CharacterAndTranscriptionAndTranslation = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 10px;
  width: 100%;
`;
