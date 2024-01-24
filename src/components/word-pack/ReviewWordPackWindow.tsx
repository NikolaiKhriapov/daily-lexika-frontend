import { useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { CopyIcon } from '@chakra-ui/icons';
import { ColorMode, useColorMode } from '@chakra-ui/react';
import { AuthContext } from '@context/AuthContext';
import { getAllWordsForWordPack } from '@services/word-packs';
import { Breakpoint, RoleName, Size } from '@utils/constants';
import { borderStyles, mediaBreakpointUp } from '@utils/functions';
import { theme } from '@utils/theme';
import { Status, WordDTO, WordPackDTO } from '@utils/types';
import Spinner from '@components/common/basic/Spinner';
import StatusBadge from '@components/common/basic/StatusBadge';
import Text from '@components/common/basic/Text';
import BadgeStreakCount from '@components/common/complex/BadgeStreakCount';
import Modal from '@components/common/complex/Modal';

type Props = {
  isOpen: boolean;
  onClose: any;
  wordPackDTO: WordPackDTO;
};

export default function ReviewWordPackWindow(props: Props) {
  const { isOpen, onClose, wordPackDTO } = props;

  const { user } = useContext(AuthContext);
  const { colorMode } = useColorMode();
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleWords, setVisibleWords] = useState<WordDTO[]>([]);
  const [page, setPage] = useState(0);
  const pageSize = 20;
  const [isWordInfoLoading, setWordInfoLoading] = useState(false);

  const fetchAllWordsForWordPack = () => {
    setWordInfoLoading(true);
    getAllWordsForWordPack(wordPackDTO.name, page, pageSize)
      .then((response) => {
        const { data } = response;
        setVisibleWords((prevData) => {
          if (page === 0) {
            return data;
          }
          return [...prevData, ...data];
        });
      })
      .catch((error) => console.error(error.code, error.response.data.message))
      .finally(() => setWordInfoLoading(false));
  };

  useEffect(() => {
    fetchAllWordsForWordPack();
  }, [wordPackDTO?.name, page, pageSize]);

  const handleScroll = () => {
    const container = containerRef.current;
    if (container!.scrollTop + container!.clientHeight >= container!.scrollHeight - 10) {
      setPage((prevPage) => prevPage + 1); // Fetch next page on scrolling to the bottom
    }
  };

  const getStatusColor = (status: Status) => {
    switch (status.toString()) {
      case Status[Status.KNOWN]:
        return 'green';
      case Status[Status.NEW]:
        return 'red';
      default:
        return 'gray';
    }
  };

  return (
    <Modal
      size={Size.XXXL}
      isOpen={isOpen}
      onClose={onClose}
      header={wordPackDTO?.name}
      body={(
        <Container>
          <TotalWords>
            <CopyIcon />
            <Text>{wordPackDTO?.totalWords}</Text>
          </TotalWords>
          <Description>
            <Text size={{ base: Size.SM, md: Size.MD, xl: Size.MD }}>{wordPackDTO?.description}</Text>
          </Description>
          <WordInfoContainer ref={containerRef} onScroll={handleScroll}>
            {isWordInfoLoading && page === 0
              ? <SpinnerContainer><Spinner /></SpinnerContainer>
              : visibleWords?.slice(0, visibleWords.length).map((wordDTO) => (
                <WordInfo $colorMode={colorMode} key={wordDTO.id}>
                  {user?.role === RoleName.USER_CHINESE && (
                    <CharacterAndPinyinAndTranslation>
                      <Text>{wordDTO.nameChineseSimplified}&nbsp;&nbsp;{wordDTO.pinyin}</Text>
                      <Text size={{ base: Size.SM, md: Size.MD, xl: Size.MD }}>{wordDTO.nameEnglish}</Text>
                    </CharacterAndPinyinAndTranslation>
                  )}
                  {user?.role === RoleName.USER_ENGLISH && (
                    <CharacterAndPinyinAndTranslation>
                      <Text>{wordDTO.nameEnglish}</Text>
                      <Text size={{ base: Size.SM, md: Size.MD, xl: Size.MD }}>{wordDTO.nameRussian}</Text>
                    </CharacterAndPinyinAndTranslation>
                  )}
                  <BadgeOrStreakCount>
                    {wordDTO.status.toString() === Status[Status.IN_REVIEW] ? (
                      Array.from({ length: wordDTO.totalStreak }).map(() => (
                        <BadgeStreakCount key={wordDTO.id} />
                      ))
                    ) : (
                      <StatusBadge text={wordDTO.status} colorScheme={getStatusColor(wordDTO.status)} />
                    )}
                  </BadgeOrStreakCount>
                </WordInfo>
              ))}
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
`;

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

const WordInfo = styled.div<{ $colorMode: ColorMode }>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px;
  border: ${({ $colorMode }) => borderStyles($colorMode)};
  border-radius: ${theme.stylesToDelete.borderRadius};
`;

const CharacterAndPinyinAndTranslation = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const TotalWords = styled.div`
  display: flex;
  flex-direction: row;
  gap: 4px;
  align-items: center;
`;

const Description = styled.div`
`;

const BadgeOrStreakCount = styled.div`
  display: flex;
  flex-direction: row;
`;
