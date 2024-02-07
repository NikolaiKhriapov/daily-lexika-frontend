import styled from 'styled-components';
import { ColorMode, Stat, useColorMode, useDisclosure } from '@chakra-ui/react';
import { FontWeight, Size } from '@utils/constants';
import { borderStyles, nonHighlightableTap } from '@utils/functions';
import { theme } from '@utils/theme';
import { ReviewStatisticsDTO } from '@utils/types';
import ProgressBar from '@components/common/basic/ProgressBar';
import Text from '@components/common/basic/Text';
import StatsReviewWindow from '@components/statistics/StatsReviewWindow';

type Props = {
  reviewStatisticsDTO: ReviewStatisticsDTO;
};

export default function StatsReviewCard(props: Props) {
  const { reviewStatisticsDTO } = props;

  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const wordsTotal = reviewStatisticsDTO.wordsNew + reviewStatisticsDTO.wordsInReview + reviewStatisticsDTO.wordsKnown;

  const wordsPercentage = {
    inReview: reviewStatisticsDTO && Math.round((reviewStatisticsDTO.wordsInReview / wordsTotal) * 100),
    known: reviewStatisticsDTO && Math.round((reviewStatisticsDTO.wordsKnown / wordsTotal) * 100),
  };

  return (
    <>
      <Container $colorMode={colorMode} shadow='2xl' onClick={onOpen}>
        <WordPackNameAndInfoButton>
          <Text size={Size.LG} fontWeight={FontWeight.SEMIBOLD}>{reviewStatisticsDTO.wordPackName}</Text>
        </WordPackNameAndInfoButton>
        <Stats>
          <Percentage>
            <Text size={Size.LG} fontWeight={FontWeight.SEMIBOLD}>{`${wordsPercentage.known}%`}</Text>
            <Text size={Size.SM} fontWeight={FontWeight.SEMIBOLD}>&nbsp;known</Text>
          </Percentage>
          <Text fontWeight={FontWeight.SEMIBOLD}>
            {`${reviewStatisticsDTO.wordsKnown}/${wordsTotal}`}
          </Text>
        </Stats>
        <ProgressBar value={wordsPercentage.known || 0} />
      </Container>
      {isOpen && (
        <StatsReviewWindow
          isOpen={isOpen}
          onClose={onClose}
          reviewStatisticsDTO={reviewStatisticsDTO}
          wordsPercentage={wordsPercentage}
          wordsTotal={wordsTotal}
        />
      )}
    </>
  );
}

const Container = styled(Stat)<{ $colorMode: ColorMode }>`
  min-width: 220px;
  max-width: 220px;
  height: 100px;
  padding: 15px;
  background-color: ${({ $colorMode }) => theme.colors[$colorMode].bgColor};
  border: ${({ $colorMode }) => borderStyles($colorMode)};
  border-radius: ${theme.stylesToDelete.borderRadius};
  box-shadow: ${theme.stylesToDelete.boxShadow};
  cursor: pointer;
  ${nonHighlightableTap};
`;

const WordPackNameAndInfoButton = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
    height: 35px;
`;

const Stats = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;

const Percentage = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
`;
