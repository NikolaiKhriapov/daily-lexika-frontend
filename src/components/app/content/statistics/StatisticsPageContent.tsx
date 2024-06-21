import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { BsFire } from 'react-icons/bs';
import { ImFire } from 'react-icons/im';
import { PiBookThin } from 'react-icons/pi';
import styled from 'styled-components';
import { useDisclosure } from '@chakra-ui/react';
import { useGetStatisticsQuery } from '@store/api/statisticsAPI';
import { useGetUserQuery } from '@store/api/userAPI';
import { RoleName } from '@utils/app/constants';
import { Breakpoint, Size } from '@utils/constants';
import { mediaBreakpointUp } from '@utils/functions';
import StatsCard from '@components/app/content/statistics/StatsCard';
import StatsReviewCard from '@components/app/content/statistics/StatsReviewCard';
import StatsWordsKnownWindow from '@components/app/content/statistics/StatsWordsKnownWindow';
import Heading from '@components/ui-common/basic/Heading';
import Text from '@components/ui-common/basic/Text';
import ErrorComponent from '@components/ui-common/complex/ErrorComponent';
import SkeletonWrapper, { SkeletonType } from '@components/ui-common/complex/SkeletonWrapper';

export default function StatisticsPageContent() {
  const { isOpen: isOpenStatsWords, onOpen: onOpenStatsWords, onClose: onCloseStatsWords } = useDisclosure();

  const { t } = useTranslation();
  const { data: user } = useGetUserQuery();
  const { data: statistics, isFetching, isError, refetch } = useGetStatisticsQuery();

  useEffect(() => {
    refetch();
  }, []);

  if (isError) return <ErrorComponent />;

  const iconStyles = { width: '45px', height: '45px' };

  return (
    <Container>
      <Section>
        <HeadingTabletAndDesktop size={Size.LG}>{t('StatisticsPage.dailyStreak.heading')}</HeadingTabletAndDesktop>
        <CardsContainer>
          <SkeletonWrapper type={SkeletonType.STATS_CARD} fixed={2} isLoading={!statistics}>
            <StatsCard
              title={t('StatisticsPage.dailyStreak.currentStreak')}
              stat={statistics?.currentStreak}
              icon={<BsFire style={iconStyles} />}
              isRefreshing={isFetching}
            />
            <StatsCard
              title={t('StatisticsPage.dailyStreak.recordStreak')}
              stat={statistics?.recordStreak}
              icon={<ImFire style={iconStyles} />}
              isRefreshing={isFetching}
            />
          </SkeletonWrapper>
        </CardsContainer>
      </Section>
      <Section>
        <HeadingTabletAndDesktop size={Size.LG}>{t('StatisticsPage.vocabulary.heading')}</HeadingTabletAndDesktop>
        <CardsContainer>
          <SkeletonWrapper type={SkeletonType.STATS_CARD} fixed={2} isLoading={!statistics}>
            <StatsCard
              title={t('StatisticsPage.vocabulary.wordsKnown')}
              stat={statistics?.wordsKnown}
              icon={<PiBookThin style={iconStyles} />}
              isRefreshing={isFetching}
              isClickable
              onOpen={onOpenStatsWords}
            />
            {isOpenStatsWords && (<StatsWordsKnownWindow isOpen={isOpenStatsWords} onClose={onCloseStatsWords} />)}
            {user?.role === RoleName.USER_CHINESE && (
              <StatsCard
                title={t('StatisticsPage.vocabulary.charactersKnown')}
                stat={statistics?.charactersKnown}
                icon={<PiBookThin style={iconStyles} />}
                isRefreshing={isFetching}
              />
            )}
          </SkeletonWrapper>
        </CardsContainer>
      </Section>
      <Section>
        <HeadingTabletAndDesktop size={Size.LG}>{t('StatisticsPage.dailyReviews.heading')}</HeadingTabletAndDesktop>
        <CardsContainer>
          <SkeletonWrapper type={SkeletonType.STATS_CARD} fixed={3} isLoading={!statistics}>
            {statistics?.listOfReviewStatisticsDto && statistics.listOfReviewStatisticsDto.length > 0
              ? (statistics.listOfReviewStatisticsDto.map((reviewStatisticsDTO, index) => (
                <StatsReviewCard key={index} reviewStatistics={reviewStatisticsDTO} isRefreshing={isFetching} />
              )))
              : <TextTabletAndDesktop size={Size.LG}>{t('StatisticsPage.dailyReviews.noReviews')}</TextTabletAndDesktop>}
          </SkeletonWrapper>
        </CardsContainer>
      </Section>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 60px;
  width: calc(100vw - 80px);

  ${mediaBreakpointUp(Breakpoint.TABLET)} {
      gap: 40px;
      width: calc(100vw - 100px);
  }
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 40px;
`;

const HeadingTabletAndDesktop = styled(Heading)`
  display: none;

  ${mediaBreakpointUp(Breakpoint.TABLET)} {
    display: flex;
    justify-content: center;
  }
`;

const TextTabletAndDesktop = styled(Text)`
  display: none;

  ${mediaBreakpointUp(Breakpoint.TABLET)} {
    display: flex;
  }
`;
