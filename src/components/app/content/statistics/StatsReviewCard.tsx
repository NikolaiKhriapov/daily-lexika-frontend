import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { ColorMode, Stat, useColorMode, useDisclosure } from '@chakra-ui/react';
import { useGetUserInfoQuery } from '@store/api/userAPI';
import { FontWeight, Size } from '@utils/constants';
import { borderStyles, nonHighlightableTap } from '@utils/functions';
import { theme } from '@utils/theme';
import { ReviewStatisticsDto } from '@utils/types';
import StatsReviewWindow from '@components/app/content/statistics/StatsReviewWindow';
import ProgressBar from '@components/ui-common/basic/ProgressBar';
import Spinner from '@components/ui-common/basic/Spinner';
import Text from '@components/ui-common/basic/Text';
import I18nHelper from '@helpers/I18nHelper';

type Props = {
  reviewStatistics: ReviewStatisticsDto;
  isRefreshing: boolean;
};

export default function StatsReviewCard(props: Props) {
  const { reviewStatistics, isRefreshing } = props;

  const { colorMode } = useColorMode();
  const { t } = useTranslation();
  const { data: user } = useGetUserInfoQuery();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const wordsTotal = reviewStatistics.wordsNew + reviewStatistics.wordsInReview + reviewStatistics.wordsKnown;
  const wordsPercentage = {
    inReview: reviewStatistics && Math.floor(wordsTotal < 1 ? 0 : (reviewStatistics.wordsInReview / wordsTotal) * 100),
    known: reviewStatistics && Math.floor(wordsTotal < 1 ? 0 : (reviewStatistics.wordsKnown / wordsTotal) * 100),
    inReviewAndKnown: reviewStatistics && Math.floor(wordsTotal < 1 ? 0 : ((reviewStatistics.wordsInReview + reviewStatistics.wordsKnown) / wordsTotal) * 100),
  };

  if (!user) return <Spinner />;

  return (
    <>
      <Container $colorMode={colorMode} onClick={onOpen}>
        <WordPackNameAndInfoButton>
          <Text size={Size.LG} fontWeight={FontWeight.SEMIBOLD}>
            {I18nHelper.getWordPackNameTranslated(reviewStatistics.wordPackName, user, t)}
          </Text>
        </WordPackNameAndInfoButton>
        <Stats>
          <Percentage>
            <Text size={Size.LG} fontWeight={FontWeight.SEMIBOLD}>{wordsPercentage.known}%&nbsp;</Text>
            <Text size={Size.SM} fontWeight={FontWeight.SEMIBOLD}>{t('StatsReviewCard.known')}</Text>
          </Percentage>
          <Text fontWeight={FontWeight.SEMIBOLD}>{reviewStatistics.wordsKnown}/{wordsTotal}</Text>
        </Stats>
        <ProgressBar value={wordsPercentage.known || 0} />
        {isRefreshing && <SpinnerContainer><Spinner size={Size.SM} /></SpinnerContainer>}
      </Container>
      {isOpen && (
        <StatsReviewWindow
          isOpen={isOpen}
          onClose={onClose}
          reviewStatisticsDTO={reviewStatistics}
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
  box-shadow: ${({ $colorMode }) => theme.stylesToDelete[$colorMode].boxShadow};
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

const SpinnerContainer = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
`;
