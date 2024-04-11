import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ColorMode, useBreakpointValue, useColorMode } from '@chakra-ui/react';
import { errorNotification, successNotification } from '@services/app/popup-notification';
import { useGetUserInfoQuery } from '@store/api/userAPI';
import { useGetAllWordDataQuery } from '@store/api/wordDataAPI';
import { useAddWordToCustomWordPackMutation, useRemoveWordFromCustomWordPackMutation } from '@store/api/wordPacksAPI';
import { RoleName } from '@utils/app/constants';
import { Breakpoint, Size } from '@utils/constants';
import { borderStyles, mediaBreakpointUp, removeAccent } from '@utils/functions';
import { theme } from '@utils/theme';
import { WordDataDto, WordPackDto } from '@utils/types';
import ButtonWithIcon, { ButtonWithIconType } from '@components/ui-common/basic/ButtonWithIcon';
import Input from '@components/ui-common/basic/Input';
import Spinner from '@components/ui-common/basic/Spinner';
import Text from '@components/ui-common/basic/Text';
import Modal from '@components/ui-common/complex/Modal';

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

  const handleAddWordToCustomWordPack = (wordDataDTO: WordDataDto) => {
    setDisabled(wordDataDTO.id);
    setOpenAddOrRemoveWord(null);
    addWordToCustomWordPack({ wordPackName: wordPack.name, wordDataId: wordDataDTO.id })
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
        setSearchResult(allWordData.filter((wordData) => getWordInfoForUserRole(wordData).searchResult));
      } else {
        setSearchResult(allWordData.slice(0, 50));
      }
    }
  }, [searchQuery]);

  const getWordInfoForUserRole = (wordDataDTO: WordDataDto) => {
    const map: Record<RoleName, any> = {
      [RoleName.USER_ENGLISH]: {
        name: wordDataDTO.nameEnglish,
        transcription: wordDataDTO.transcription,
        translation: wordDataDTO.nameRussian,
        searchResult: wordDataDTO.nameEnglish.toLowerCase().startsWith(searchQuery.toLowerCase()),
      },
      [RoleName.USER_CHINESE]: {
        name: wordDataDTO.nameChineseSimplified,
        transcription: wordDataDTO.transcription,
        translation: wordDataDTO.nameEnglish,
        searchResult: removeAccent(wordDataDTO.nameChineseSimplified).toLowerCase().includes(removeAccent(searchQuery).toLowerCase())
          || removeAccent(wordDataDTO.transcription).toLowerCase().startsWith(removeAccent(searchQuery).toLowerCase()),
      },
      [RoleName.ADMIN]: null,
    };
    return map[user!.role!];
  };

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
            {isLoadingAllWordData
              ? <SpinnerContainer><Spinner /></SpinnerContainer>
              : (searchResult && searchResult.map((wordDataDTO) => (
                <WordInfo
                  key={wordDataDTO.id}
                  onClick={() => onClickWordData(wordDataDTO)}
                  $colorMode={colorMode}
                  $isWordAdded={isWordAlreadyAddedToWordPack(wordDataDTO)}
                >
                  <CharacterAndTranscriptionAndTranslation>
                    <Text>{getWordInfoForUserRole(wordDataDTO)?.name}&nbsp;&nbsp;{getWordInfoForUserRole(wordDataDTO)?.transcription}</Text>
                    <Text size={{ base: Size.SM, md: Size.MD, xl: Size.MD }}>{getWordInfoForUserRole(wordDataDTO)?.translation}</Text>
                  </CharacterAndTranscriptionAndTranslation>
                  <RightIconContainer
                    $isShown={isOpenAddOrRemoveWord === wordDataDTO.id}
                    $isDisabled={isDisabled === wordDataDTO.id}
                  >
                    {!isWordAlreadyAddedToWordPack(wordDataDTO) && (
                      <ButtonWithIcon
                        type={ButtonWithIconType.ADD_WORD}
                        onClick={() => handleAddWordToCustomWordPack(wordDataDTO)}
                        isDisabled={isDisabled === wordDataDTO.id}
                      />
                    )}
                    {isWordAlreadyAddedToWordPack(wordDataDTO) && (
                      <ButtonWithIcon
                        type={ButtonWithIconType.REMOVE_WORD}
                        onClick={() => handleRemoveWordFromCustomWordPack(wordDataDTO)}
                        isDisabled={isDisabled === wordDataDTO.id}
                      />
                    )}
                  </RightIconContainer>
                </WordInfo>
              )))}
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

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
`;
