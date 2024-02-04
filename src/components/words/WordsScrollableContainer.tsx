import React, { useContext, useRef, useState } from 'react';
import styled from 'styled-components';
import { ColorMode, useColorMode, useDisclosure } from '@chakra-ui/react';
import { AuthContext } from '@context/AuthContext';
import { Breakpoint, RoleName, Size } from '@utils/constants';
import { borderStyles, mediaBreakpointUp } from '@utils/functions';
import { theme } from '@utils/theme';
import { WordDTO } from '@utils/types';
import Spinner from '@components/common/basic/Spinner';
import Text from '@components/common/basic/Text';
import BadgeOrStreakCount from '@components/common/complex/BadgeOrStreakCount';
import WordDetailedInfo from '@components/statistics/WordDetailedInfo';

type Props = {
  words: WordDTO[];
  isLoading: boolean;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

export default function WordsScrollableContainer(props: Props) {
  const { words, isLoading, page, setPage } = props;

  const { user } = useContext(AuthContext);
  const { colorMode } = useColorMode();
  const containerRef = useRef<HTMLDivElement>(null);
  const { isOpen: isOpenDetails, onOpen: onOpenDetails, onClose: onCloseDetails } = useDisclosure();
  const [selectedWord, setSelectedWord] = useState<number | null>();

  const handleScroll = () => {
    const container = containerRef.current;
    if (container!.scrollTop + container!.clientHeight >= container!.scrollHeight - 10) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const getWordInfoForUserRole = (wordDTO: WordDTO) => {
    const map: Record<RoleName, any> = {
      [RoleName.USER_ENGLISH]: {
        name: wordDTO.nameEnglish,
        transcription: wordDTO.transcription,
        translation: wordDTO.nameRussian,
      },
      [RoleName.USER_CHINESE]: {
        name: wordDTO.nameChineseSimplified,
        transcription: wordDTO.transcription,
        translation: wordDTO.nameEnglish,
      },
      [RoleName.ADMIN]: null,
    };
    return map[user!.role!];
  };

  const onClick = (wordId: number) => {
    setSelectedWord(wordId);
    onOpenDetails();
  };

  return (
    <WordInfoContainer ref={containerRef} onScroll={handleScroll}>
      {isLoading && page === 0
        ? <SpinnerContainer><Spinner /></SpinnerContainer>
        : words?.slice(0, words.length).map((wordDTO) => (
          <WordInfo $colorMode={colorMode} key={wordDTO.id} onClick={() => onClick(wordDTO.id)} $role={user!.role!}>
            <CharacterAndTranscriptionAndTranslation>
              <Text>{getWordInfoForUserRole(wordDTO)?.name}&nbsp;&nbsp;{getWordInfoForUserRole(wordDTO)?.transcription}</Text>
              <Text size={{ base: Size.SM, md: Size.MD, xl: Size.MD }}>{getWordInfoForUserRole(wordDTO)?.translation}</Text>
            </CharacterAndTranscriptionAndTranslation>
            <BadgeOrStreakCount wordDTO={wordDTO} />
            {isOpenDetails && user!.role! === RoleName.USER_ENGLISH && (
              <WordDetailedInfo
                isOpen={isOpenDetails && wordDTO.id === selectedWord}
                onClose={onCloseDetails}
                wordId={wordDTO.id}
              />
            )}
          </WordInfo>
        ))}
    </WordInfoContainer>
  );
}

const WordInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  height: 60vh;
  overflow-y: auto;
  max-width: 800px;

  ${mediaBreakpointUp(Breakpoint.DESKTOP)} {
    width: 800px;
  }
`;

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const WordInfo = styled.div<{ $colorMode: ColorMode; $role: RoleName }>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px;
  border: ${({ $colorMode }) => borderStyles($colorMode)};
  border-radius: ${theme.stylesToDelete.borderRadius};
  cursor: ${({ $role }) => $role === RoleName.USER_ENGLISH && 'pointer'};
  &:hover {
    background-color: ${({ $colorMode, $role }) =>
    $role === RoleName.USER_ENGLISH && theme.colors[$colorMode].hoverBgColor};
  }
`;

const CharacterAndTranscriptionAndTranslation = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
