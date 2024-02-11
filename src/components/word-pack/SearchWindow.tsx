import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { ColorMode, useColorMode } from '@chakra-ui/react';
import { AuthContext } from '@context/AuthContext';
import { WordDataContext } from '@context/WordDataContext';
import { errorNotification, successNotification } from '@services/popup-notification';
import { addWordToCustomWordPack, removeWordFromCustomWordPack } from '@services/word-packs';
import { Breakpoint, ButtonWithIconType, RoleName, Size } from '@utils/constants';
import { borderStyles, mediaBreakpointUp } from '@utils/functions';
import { theme } from '@utils/theme';
import { WordDataDTO, WordPackDTO } from '@utils/types';
import ButtonWithIcon from '@components/common/basic/ButtonWithIcon';
import Input from '@components/common/basic/Input';
import Text from '@components/common/basic/Text';
import Modal from '@components/common/complex/Modal';

type Props = {
  isOpen: boolean;
  onClose: any;
  wordPackDTO: WordPackDTO;
  setReloadCard: any;
};

export default function SearchWindow(props: Props) {
  const { isOpen, onClose, wordPackDTO, setReloadCard } = props;

  const { user } = useContext(AuthContext);
  const { allWordDataDTO, updateWordDataDTO, removeAccent } = useContext(WordDataContext);
  const { colorMode } = useColorMode();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResult, setSearchResult] = useState<WordDataDTO[]>([]);
  const [isDisabled, setDisabled] = useState<number | null>(null);
  const [isOpenAddOrRemoveWord, setOpenAddOrRemoveWord] = useState<number | null>(null);

  const handleAddWordToCustomWordPack = (wordDataDTO: WordDataDTO) => {
    setDisabled(wordDataDTO.id);
    setOpenAddOrRemoveWord(null);
    addWordToCustomWordPack(wordPackDTO.name, wordDataDTO.id)
      .then((response) => {
        setReloadCard(true);
        successNotification('Word added successfully', '');
        updateWordDataDTO(response.data);
      })
      .catch((e) => {
        errorNotification(e.code, e.response.data.message);
      })
      .finally(() => setDisabled(null));
  };

  const handleRemoveWordFromCustomWordPack = (wordDataDTO: WordDataDTO) => {
    setDisabled(wordDataDTO.id);
    setOpenAddOrRemoveWord(null);
    removeWordFromCustomWordPack(wordPackDTO.name, wordDataDTO.id)
      .then((response) => {
        setReloadCard(true);
        successNotification('Word removed successfully', '');
        updateWordDataDTO(response.data);
      })
      .catch((e) => errorNotification(e.code, e.response.data.message))
      .finally(() => setDisabled(null));
  };

  useEffect(() => {
    setSearchResult(allWordDataDTO);
  }, []);

  useEffect(() => {
    if (searchQuery.trim() !== '') {
      setSearchResult(allWordDataDTO.filter((wordData) => getWordInfoForUserRole(wordData).searchResult));
    } else {
      setSearchResult([]);
    }
  }, [searchQuery]);

  const getWordInfoForUserRole = (wordDataDTO: WordDataDTO) => {
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

  const isWordAlreadyAddedToWordPack = (wordData: WordDataDTO) =>
    allWordDataDTO.some((wordDataDTO) => wordDataDTO.id === wordData.id && wordDataDTO.listOfWordPackNames.includes(wordPackDTO.name));

  const onClickWordData = (wordDataDTO: WordDataDTO) => {
    if (isDisabled !== wordDataDTO.id) {
      setOpenAddOrRemoveWord(wordDataDTO.id);
    }
  };

  return (
    <Modal
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
            {searchResult.map((wordDataDTO) => (
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
            ))}
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
  overflow-y: auto;
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
