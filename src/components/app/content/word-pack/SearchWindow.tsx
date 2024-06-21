import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { ColorMode, useBreakpointValue, useColorMode } from '@chakra-ui/react';
import { errorNotification, successNotification } from '@services/app/popup-notification';
import { useGetUserQuery } from '@store/api/userAPI';
import { useGetAllWordDataQuery } from '@store/api/wordDataAPI';
import {
  useAddAllWordsFromWordPackToCustomWordPackMutation,
  useAddWordToCustomWordPackMutation,
  useGetAllWordPacksQuery,
  useRemoveWordFromCustomWordPackMutation,
} from '@store/api/wordPacksAPI';
import { Breakpoint, FontWeight, Size } from '@utils/constants';
import { borderStyles, mediaBreakpointUp } from '@utils/functions';
import { theme } from '@utils/theme';
import { Category, WordDataDto, WordPackDto } from '@utils/types';
import ButtonWithIcon, { ButtonWithIconType } from '@components/ui-common/basic/ButtonWithIcon';
import Spinner from '@components/ui-common/basic/Spinner';
import Text from '@components/ui-common/basic/Text';
import Modal from '@components/ui-common/complex/Modal';
import SearchInput from '@components/ui-common/complex/SearchInput';
import WordDataHelper from '@helpers/WordDataHelper';

type Props = {
  isOpen: boolean;
  onClose: any;
  wordPack: WordPackDto;
};

export default function SearchWindow(props: Props) {
  const { isOpen, onClose, wordPack } = props;

  const { colorMode } = useColorMode();
  const { t } = useTranslation();
  const { data: user } = useGetUserQuery();
  const { data: allWordData = [], isLoading: isLoadingAllWordData } = useGetAllWordDataQuery();
  const { data: allWordPacks = [] } = useGetAllWordPacksQuery();
  const [addWordToCustomWordPack] = useAddWordToCustomWordPackMutation();
  const [removeWordFromCustomWordPack] = useRemoveWordFromCustomWordPackMutation();
  const [addAllWordsFromWordPackToCustomWordPack, { isLoading: isLoadingAddAllWords }] = useAddAllWordsFromWordPackToCustomWordPackMutation();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResult, setSearchResult] = useState<WordDataDto[]>([]);
  const [isDisabled, setDisabled] = useState<number | null>(null);
  const [isOpenAddOrRemoveWord, setOpenAddOrRemoveWord] = useState<number | null>(null);
  const [valueLoading, setValueLoading] = useState<string>('');

  const modalWidth = useBreakpointValue({ base: '450px', md: 'auto' });

  const handleAddWordToCustomWordPack = (wordDataDto: WordDataDto) => {
    setDisabled(wordDataDto.id);
    setOpenAddOrRemoveWord(null);
    addWordToCustomWordPack({ wordPackName: wordPack.name, wordDataId: wordDataDto.id })
      .unwrap()
      .then(() => successNotification(t('SearchWindow.successMessage.addWord')))
      .catch((error) => errorNotification('', error))
      .finally(() => setDisabled(null));
  };

  const handleRemoveWordFromCustomWordPack = (wordDataDTO: WordDataDto) => {
    setDisabled(wordDataDTO.id);
    setOpenAddOrRemoveWord(null);
    removeWordFromCustomWordPack({ wordPackName: wordPack.name, wordDataId: wordDataDTO.id })
      .unwrap()
      .then(() => successNotification(t('SearchWindow.successMessage.removeWord')))
      .catch((error) => errorNotification('', error))
      .finally(() => setDisabled(null));
  };

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
        setSearchResult(allWordData.slice(0, 50));
      }
    }
  }, [searchQuery]);

  const isWordAlreadyAddedToWordPack = (wordData: WordDataDto) =>
    allWordData.some((wordDataDTO) => wordDataDTO.id === wordData.id && wordDataDTO.listOfWordPackNames.includes(wordPack.name));

  const onClickWordData = (wordDataId: number) => {
    if (isDisabled !== wordDataId) {
      setOpenAddOrRemoveWord(wordDataId);
    }
  };

  const onClickAddAllWordsFromWordPackToCustomWordPack = (wordPackName: string) => {
    setValueLoading(wordPackName);
    addAllWordsFromWordPackToCustomWordPack({ wordPackNameTo: wordPack.name, wordPackNameFrom: wordPackName })
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
            isLoading={isLoadingAllWordData}
          />
          <WordInfoContainer>
            {
              searchQuery === '' || isLoadingAllWordData
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
                              onClick={() => onClickAddAllWordsFromWordPackToCustomWordPack(oneWordPack.name)}
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
                        <Text size={{ base: Size.SM, md: Size.MD, xl: Size.MD }}>{WordDataHelper.getWordDataTranslationWithoutDuplicate(wordDataDto, user!)}</Text>
                      </CharacterAndTranscriptionAndTranslation>
                      <RightIconContainer
                        $isShown={isOpenAddOrRemoveWord === wordDataDto.id}
                        $isDisabled={isDisabled === wordDataDto.id}
                      >
                        {!isWordAlreadyAddedToWordPack(wordDataDto) && (
                          <ButtonWithIcon
                            type={ButtonWithIconType.ADD_WORD}
                            onClick={() => handleAddWordToCustomWordPack(wordDataDto)}
                            isDisabled={isDisabled === wordDataDto.id}
                          />
                        )}
                        {isWordAlreadyAddedToWordPack(wordDataDto) && (
                          <ButtonWithIcon
                            type={ButtonWithIconType.REMOVE_WORD}
                            onClick={() => handleRemoveWordFromCustomWordPack(wordDataDto)}
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
