import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { ColorMode, useColorMode, useDisclosure } from '@chakra-ui/react';
import { useGetUserInfoQuery } from '@store/api/userAPI';
import { Breakpoint, Size } from '@utils/constants';
import { borderStyles, mediaBreakpointUp } from '@utils/functions';
import { theme } from '@utils/theme';
import { WordDto } from '@utils/types';
import WordDetailedInfo from '@components/app/content/words/WordDetailedInfo';
import Spinner from '@components/ui-common/basic/Spinner';
import Text from '@components/ui-common/basic/Text';
import BadgeOrStreakCount from '@components/ui-common/complex/BadgeOrStreakCount';
import WordDataHelper from '@helpers/WordDataHelper';

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

  const onClick = (wordId: number) => {
    setSelectedWord(wordId);
    onOpenDetails();
  };

  return (
    <WordInfoContainer ref={containerRef} onScroll={handleScroll}>
      {isLoading && page === 0
        ? <SpinnerContainer><Spinner /></SpinnerContainer>
        : visibleWords.slice(0, visibleWords.length).map((word, index) => (
          <WordInfo $colorMode={colorMode} key={index} onClick={() => onClick(word.id)}>
            <CharacterAndTranscriptionAndTranslation>
              <Text>{WordDataHelper.getWordNameByUserRole(word, user)}&nbsp;&nbsp;{word.wordDataDto.transcription}</Text>
              <Text size={{ base: Size.SM, md: Size.MD, xl: Size.MD }}>{WordDataHelper.getWordTranslationWithoutDuplicate(word, user)}</Text>
            </CharacterAndTranscriptionAndTranslation>
            <BadgeOrStreakCount word={word} />
            {isOpenDetails && (
              <WordDetailedInfo
                isOpen={isOpenDetails && word.id === selectedWord}
                onClose={onCloseDetails}
                wordData={word.wordDataDto}
                word={word}
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
  width: 100%;
  overflow-y: auto;

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

  &:hover {
    background-color: ${({ $colorMode }) => theme.colors[$colorMode].hoverBgColor};
  }
`;

const CharacterAndTranscriptionAndTranslation = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
