import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { ColorMode, useColorMode, useDisclosure } from '@chakra-ui/react';
import { useGetUserQuery } from '@store/api/userAPI';
import { Breakpoint, Size } from '@utils/constants';
import { borderStyles, mediaBreakpointUp } from '@utils/functions';
import { theme } from '@utils/theme';
import { PageResponse, WordDto } from '@utils/types';
import WordDetailedInfoDrawer from '@components/app/content/words/WordDetailedInfoDrawer';
import Spinner from '@components/ui-common/basic/Spinner';
import Text from '@components/ui-common/basic/Text';
import BadgeOrStreakCount from '@components/ui-common/complex/BadgeOrStreakCount';
import WordDataHelper from '@helpers/WordDataHelper';

type Props = {
  pageResponse: PageResponse<WordDto>;
  setPage: Dispatch<SetStateAction<number>>;
};

export default function WordsScrollableContainer(props: Props) {
  const { pageResponse, setPage } = props;

  const containerRef = useRef<HTMLDivElement>(null);
  const { colorMode } = useColorMode();
  const { data: user } = useGetUserQuery();
  const { isOpen: isOpenDetails, onOpen: onOpenDetails, onClose: onCloseDetails } = useDisclosure();
  const [selectedWord, setSelectedWord] = useState<number | null>();
  const [visibleWords, setVisibleWords] = useState<WordDto[]>([]);

  const pageOfWords = pageResponse.content;

  useEffect(() => {
    updateVisibleWords();
  }, [pageOfWords, pageResponse.number]);

  const updateVisibleWords = () => {
    if (pageOfWords && pageOfWords.length > 0) {
      setVisibleWords((prevWords) => {
        if (pageResponse.first) {
          return pageOfWords;
        }
        return [...prevWords, ...pageOfWords.filter((word) => !prevWords.some((prevWord) => prevWord.id === word.id))];
      });
    }
  };

  const handleScroll = () => {
    const container = containerRef.current;
    if ((container!.scrollTop + container!.clientHeight >= container!.scrollHeight - 10) && !pageResponse.last) {
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
      {visibleWords.slice(0, visibleWords.length).map((word, index) => (
        <WordInfo $colorMode={colorMode} key={index} onClick={() => onClick(word.id)}>
          <CharacterAndTranscriptionAndTranslation>
            <Text>{WordDataHelper.getWordNameByUserRole(word, user)}&nbsp;&nbsp;{word.wordDataDto.transcription}</Text>
            <Text size={{ base: Size.SM, md: Size.MD, xl: Size.MD }}>{WordDataHelper.getWordTranslationWithoutDuplicate(word, user)}</Text>
          </CharacterAndTranscriptionAndTranslation>
          <BadgeOrStreakCount word={word} />
          {isOpenDetails && (
            <WordDetailedInfoDrawer
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
