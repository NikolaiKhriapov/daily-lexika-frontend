import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ColorMode, useBreakpointValue, useColorMode } from '@chakra-ui/react';
import { errorNotification, successNotification } from '@services/app/popup-notification';
import { useGetUserInfoQuery } from '@store/api/userAPI';
import { useGetAllWordDataQuery } from '@store/api/wordDataAPI';
import { useAddWordToCustomWordPackMutation, useRemoveWordFromCustomWordPackMutation } from '@store/api/wordPacksAPI';
import { Breakpoint, Size } from '@utils/constants';
import { borderStyles, mediaBreakpointUp } from '@utils/functions';
import { theme } from '@utils/theme';
import { WordDataDto, WordPackDto } from '@utils/types';
import ButtonWithIcon, { ButtonWithIconType } from '@components/ui-common/basic/ButtonWithIcon';
import Input from '@components/ui-common/basic/Input';
import { SkeletonType } from '@components/ui-common/basic/Skeleton';
import Text from '@components/ui-common/basic/Text';
import Modal from '@components/ui-common/complex/Modal';
import SkeletonWrapper from '@components/ui-common/complex/SkeletonWrapper';
import WordDataHelper from '@helpers/WordDataHelper';

type Props = {
  isOpen: boolean;
  onClose: any;
  wordPack: WordPackDto;
};

export default function SearchWindow(props: Props) {
  const { isOpen, onClose, wordPack } = props;

  const { colorMode } = useColorMode();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResult, setSearchResult] = useState<WordDataDto[]>([]);
  const [isDisabled, setDisabled] = useState<number | null>(null);
  const [isOpenAddOrRemoveWord, setOpenAddOrRemoveWord] = useState<number | null>(null);

  const { data: user } = useGetUserInfoQuery();
  const { data: allWordData = [], isLoading: isLoadingAllWordData } = useGetAllWordDataQuery();
  const [addWordToCustomWordPack] = useAddWordToCustomWordPackMutation();
  const [removeWordFromCustomWordPack] = useRemoveWordFromCustomWordPackMutation();

  const handleAddWordToCustomWordPack = (wordDataDto: WordDataDto) => {
    setDisabled(wordDataDto.id);
    setOpenAddOrRemoveWord(null);
    addWordToCustomWordPack({ wordPackName: wordPack.name, wordDataId: wordDataDto.id })
      .unwrap()
      .then(() => successNotification('Word added successfully', ''))
      .catch((error) => errorNotification('', error))
      .finally(() => setDisabled(null));
  };

  const handleRemoveWordFromCustomWordPack = (wordDataDTO: WordDataDto) => {
    setDisabled(wordDataDTO.id);
    setOpenAddOrRemoveWord(null);
    removeWordFromCustomWordPack({ wordPackName: wordPack.name, wordDataId: wordDataDTO.id })
      .unwrap()
      .then(() => successNotification('Word removed successfully', ''))
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

  const onClickWordData = (wordDataDTO: WordDataDto) => {
    if (isDisabled !== wordDataDTO.id) {
      setOpenAddOrRemoveWord(wordDataDTO.id);
    }
  };

  return (
    <Modal
      width={useBreakpointValue({ base: '450px', md: 'auto' })}
      isOpen={isOpen}
      onClose={onClose}
      header="Add or remove words"
      body={(
        <>
          <Input
            name="search"
            type="text"
            placeholder="Start typing a word..."
            width={{ base: '100%', md: '500px' }}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <WordInfoContainer>
            <SkeletonWrapper type={SkeletonType.WORD_INFO} isLoading={isLoadingAllWordData}>
              {(searchResult && searchResult.map((wordDataDto) => (
                <WordInfo
                  key={wordDataDto.id}
                  onClick={() => onClickWordData(wordDataDto)}
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
              )))}
            </SkeletonWrapper>
          </WordInfoContainer>
        </>
      )}
    />
  );
}

const WordInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  height: 60vh;
  overflow-x: hidden;
  width: 100%;
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
