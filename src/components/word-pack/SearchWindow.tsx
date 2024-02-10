import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { ColorMode, useColorMode } from '@chakra-ui/react';
import { AuthContext } from '@context/AuthContext';
import { errorNotification, successNotification } from '@services/popup-notification';
import { search } from '@services/word-data';
import { addWordToCustomWordPack, removeWordFromCustomWordPack } from '@services/word-packs';
import { Breakpoint, RoleName, Size } from '@utils/constants';
import { borderStyles, mediaBreakpointUp } from '@utils/functions';
import { theme } from '@utils/theme';
import { WordDataDTO, WordPackDTO } from '@utils/types';
import Input from '@components/common/basic/Input';
import Text from '@components/common/basic/Text';
import AlertDialog from '@components/common/complex/AlertDialog';
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
  const { colorMode } = useColorMode();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResult, setSearchResult] = useState<WordDataDTO[]>([]);
  const [isDisabled, setDisabled] = useState(false);
  const [isOpenRemove, setOpenRemove] = useState<number | null>();

  const handleSearchWordData = () => {
    search(searchQuery)
      .then((response) => setSearchResult(response.data))
      .catch((e) => errorNotification(e.code, e.response.data.message));
  };

  const handleAddWordToCustomWordPack = (wordDataDTO: WordDataDTO) => {
    setDisabled(true);
    addWordToCustomWordPack(wordPackDTO.name, wordDataDTO.id)
      .then(() => {
        setReloadCard(true);
        successNotification('Word added successfully', '');
      })
      .catch((e) => errorNotification(e.code, e.response.data.message))
      .finally(() => {
        handleSearchWordData();
        setDisabled(false);
      });
  };

  const handleRemoveWordFromCustomWordPack = (wordDataDTO: WordDataDTO) => {
    setDisabled(true);
    removeWordFromCustomWordPack(wordPackDTO.name, wordDataDTO.id)
      .then(() => {
        setReloadCard(true);
        successNotification('Word removed successfully', '');
      })
      .catch((e) => errorNotification(e.code, e.response.data.message))
      .finally(() => {
        handleSearchWordData();
        setOpenRemove(null);
        setDisabled(false);
      });
  };

  useEffect(() => {
    if (searchQuery.trim() !== '') {
      handleSearchWordData();
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
      },
      [RoleName.USER_CHINESE]: {
        name: wordDataDTO.nameChineseSimplified,
        transcription: wordDataDTO.transcription,
        translation: wordDataDTO.nameEnglish,
      },
      [RoleName.ADMIN]: null,
    };
    return map[user!.role!];
  };

  const isWordAlreadyAddedToWordPack = (wordDataDTO: WordDataDTO) => wordDataDTO.listOfWordPackNames.includes(wordPackDTO.name);

  const onClickWordData = (wordDataDTO: WordDataDTO) => {
    if (!isDisabled) {
      if (isWordAlreadyAddedToWordPack(wordDataDTO)) {
        setOpenRemove(wordDataDTO.id);
      } else {
        handleAddWordToCustomWordPack(wordDataDTO);
      }
    }
  };

  const onCloseRemove = () => setOpenRemove(null);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      header='Search'
      body={(
        <>
          <Input
            name='search'
            type='text'
            placeholder='Start typing a word or pinyin...'
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
                <AlertDialog
                  isOpen={isOpenRemove === wordDataDTO.id}
                  onClose={onCloseRemove}
                  handleDelete={() => handleRemoveWordFromCustomWordPack(wordDataDTO)}
                  header="Remove word from word pack?"
                  body="Are you sure you want to remove this word from word pack?"
                  deleteButtonText="Remove"
                  isButtonDisabled={false}
                  width='600px'
                />
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
  width: 100%;
  padding: 10px;
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

const CharacterAndTranscriptionAndTranslation = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
