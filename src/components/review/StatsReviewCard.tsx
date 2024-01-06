import { ColorMode, Stat, useColorMode, useDisclosure } from '@chakra-ui/react';
import styled from 'styled-components/macro';
import StatsReviewWindow from './StatsReviewWindow';
import { ReviewStatisticsDTO } from '../../utils/types';
import Text from '../common/basic/Text';
import ProgressBar from '../common/basic/ProgressBar';
import InfoButton from '../common/basic/InfoButton';
import { theme } from '../../utils/theme';
import { borderStyles } from '../../utils/functions';
import { FontWeight, Size } from '../../utils/constants';

type Props = {
  reviewStatisticsDTO: ReviewStatisticsDTO;
};

export default function StatsReviewCard(props: Props) {
  const { reviewStatisticsDTO } = props;

  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const wordsPercentage = {
    inReview: reviewStatisticsDTO && Math.round((reviewStatisticsDTO.wordsInReview / reviewStatisticsDTO.wordsTotal) * 100),
    known: reviewStatisticsDTO && Math.round((reviewStatisticsDTO.wordsKnown / reviewStatisticsDTO.wordsTotal) * 100),
  };

  return (
    <Container $colorMode={colorMode} shadow='2xl'>
      <WordPackNameAndInfoButton>
        <Text size={Size.LG} fontWeight={FontWeight.SEMIBOLD}>{reviewStatisticsDTO.wordPackName}</Text>
        <InfoButton onClick={onOpen} />
        {isOpen && (
          <StatsReviewWindow
            isOpen={isOpen}
            onClose={onClose}
            reviewStatisticsDTO={reviewStatisticsDTO}
            wordsPercentage={wordsPercentage}
          />
        )}
      </WordPackNameAndInfoButton>
      <Stats>
        <Percentage>
          <Text size={Size.LG} fontWeight={FontWeight.SEMIBOLD}>{`${wordsPercentage.known}%`}</Text>
          <Text size={Size.SM} fontWeight={FontWeight.SEMIBOLD}>&nbsp;known</Text>
        </Percentage>
        <Text fontWeight={FontWeight.SEMIBOLD}>
          {`${reviewStatisticsDTO.wordsKnown}/${reviewStatisticsDTO.wordsTotal}`}
        </Text>
      </Stats>
      <ProgressBar value={wordsPercentage.known || 0} />
    </Container>
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
