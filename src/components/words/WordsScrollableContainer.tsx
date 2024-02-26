import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { ColorMode, useColorMode, useDisclosure } from '@chakra-ui/react';
import { useGetUserInfoQuery } from '@store/api/userAPI';
import { Breakpoint, RoleName, Size } from '@utils/constants';
import { borderStyles, mediaBreakpointUp } from '@utils/functions';
import { theme } from '@utils/theme';
import { WordDto } from '@utils/types';
import Spinner from '@components/common/basic/Spinner';
import Text from '@components/common/basic/Text';
import BadgeOrStreakCount from '@components/common/complex/BadgeOrStreakCount';
import WordDetailedInfo from '@components/statistics/WordDetailedInfo';

type Props = {
  wordsPage: WordDto[];
  isLoading: boolean;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

export default function WordsScrollableContainer(props: Props) {
  const { wordsPage, isLoading, page, setPage } = props;

  const { colorMode } = useColorMode();
  const containerRef = useRef<HTMLDivElement>(null);
  const { isOpen: isOpenDetails, onOpen: onOpenDetails, onClose: onCloseDetails } = useDisclosure();
  const [selectedWord, setSelectedWord] = useState<number | null>();
  const [visibleWords, setVisibleWords] = useState<WordDto[]>([]);

  const { data: user } = useGetUserInfoQuery();

  useEffect(() => {
    updateVisibleWords();
  }, [wordsPage, page]);

  const updateVisibleWords = () => {
    if (wordsPage && wordsPage.length > 0) {
      setVisibleWords((prevWords) => {
        if (page === 0) {
          return wordsPage;
        }
        return [...prevWords, ...wordsPage.filter((word) => !prevWords.some((prevWord) => prevWord.id === word.id))];
      });
    }
  };

  const handleScroll = () => {
    const container = containerRef.current;
    if (container!.scrollTop + container!.clientHeight >= container!.scrollHeight - 10) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  if (!user) return <Spinner />;

  const getWordInfoForUserRole = (wordDTO: WordDto) => {
    const map: Record<RoleName, any> = {
      [RoleName.USER_ENGLISH]: {
        name: wordDTO.wordDataDto.nameEnglish,
        transcription: wordDTO.wordDataDto.transcription,
        translation: wordDTO.wordDataDto.nameRussian,
      },
      [RoleName.USER_CHINESE]: {
        name: wordDTO.wordDataDto.nameChineseSimplified,
        transcription: wordDTO.wordDataDto.transcription,
        translation: wordDTO.wordDataDto.nameEnglish,
      },
      [RoleName.ADMIN]: null,
    };
    return map[user.role!];
  };

  const onClick = (wordId: number) => {
    setSelectedWord(wordId);
    onOpenDetails();
  };

  return (
    <WordInfoContainer ref={containerRef} onScroll={handleScroll}>
      {isLoading && page === 0
        ? <SpinnerContainer><Spinner /></SpinnerContainer>
        : visibleWords.slice(0, visibleWords.length).map((wordDTO, index) => (
          <WordInfo $colorMode={colorMode} key={index} onClick={() => onClick(wordDTO.id)}>
            <CharacterAndTranscriptionAndTranslation>
              <Text>{getWordInfoForUserRole(wordDTO)?.name}&nbsp;&nbsp;{getWordInfoForUserRole(wordDTO)?.transcription}</Text>
              <Text size={{ base: Size.SM, md: Size.MD, xl: Size.MD }}>{getWordInfoForUserRole(wordDTO)?.translation}</Text>
            </CharacterAndTranscriptionAndTranslation>
            <BadgeOrStreakCount word={wordDTO} />
            {isOpenDetails && (
              <WordDetailedInfo
                isOpen={isOpenDetails && wordDTO.id === selectedWord}
                onClose={onCloseDetails}
                word={wordDTO}
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
  width: 100%;

  ${mediaBreakpointUp(Breakpoint.TABLET)} {
    width: 500px;
  }
`;

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const WordInfo = styled.div<{ $colorMode: ColorMode }>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px;
  border: ${({ $colorMode }) => borderStyles($colorMode)};
  border-radius: ${theme.stylesToDelete.borderRadius};
  cursor: pointer;
`;

const CharacterAndTranscriptionAndTranslation = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
