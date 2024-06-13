import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { ColorMode, useColorMode, useDisclosure } from '@chakra-ui/react';
import { useGetUserInfoQuery } from '@store/api/userAPI';
import { useGetAllWordDataQuery } from '@store/api/wordDataAPI';
import { Breakpoint, FontWeight, Size } from '@utils/constants';
import { borderStyles, mediaBreakpointUp } from '@utils/functions';
import { theme } from '@utils/theme';
import { WordDataDto } from '@utils/types';
import WordDetailedInfoDrawer from '@components/app/content/words/WordDetailedInfoDrawer';
import Spinner from '@components/ui-common/basic/Spinner';
import Text from '@components/ui-common/basic/Text';
import SearchInput from '@components/ui-common/complex/SearchInput';
import WordDataHelper from '@helpers/WordDataHelper';

export default function SearchPageContent() {
  const { colorMode } = useColorMode();
  const { t } = useTranslation();
  const { data: user } = useGetUserInfoQuery();
  const { data: allWordData = [], isLoading: isLoadingAllWordData } = useGetAllWordDataQuery();
  const { isOpen: isOpenDetails, onOpen: onOpenDetails, onClose: onCloseDetails } = useDisclosure();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResult, setSearchResult] = useState<WordDataDto[]>([]);
  const [selectedWordDataId, setSelectedWordDataId] = useState<number>();

  useEffect(() => {
    if (allWordData) {
      setSearchResult(allWordData);
    }
  }, []);

  useEffect(() => {
    if (allWordData) {
      if (searchQuery.trim() !== '') {
        setSearchResult(allWordData.filter((wordData) => WordDataHelper.checkAgainstSearchQuery(wordData, searchQuery, user!)));
      } else {
        setSearchResult(allWordData.slice(0, 100));
      }
    }
  }, [searchQuery]);

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
        isLoading={isLoadingAllWordData}
      />
      <WordInfoContainer>
        {
          searchQuery === '' || isLoadingAllWordData
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
