import React, { useEffect } from 'react';
import { BsFire } from 'react-icons/bs';
import { ImFire } from 'react-icons/im';
import { PiBookThin } from 'react-icons/pi';
import styled from 'styled-components';
import { useDisclosure } from '@chakra-ui/react';
import { useGetStatisticsQuery } from '@store/api/statisticsAPI';
import { useGetUserInfoQuery } from '@store/api/userAPI';
import { wordsAPI } from '@store/api/wordsAPI';
import { useAppDispatch } from '@store/hooks/hooks';
import { RoleName } from '@utils/app/constants';
import { Breakpoint, Size } from '@utils/constants';
import { mediaBreakpointUp } from '@utils/functions';
import { Status } from '@utils/types';
import StatsCard from '@components/app/content/statistics/StatsCard';
import StatsReviewCard from '@components/app/content/statistics/StatsReviewCard';
import StatsWordsWindow from '@components/app/content/statistics/StatsWordsWindow';
import Heading from '@components/ui-common/basic/Heading';
import { SkeletonType } from '@components/ui-common/basic/Skeleton';
import Text from '@components/ui-common/basic/Text';
import ErrorComponent from '@components/ui-common/complex/ErrorComponent';
import SkeletonWrapper from '@components/ui-common/complex/SkeletonWrapper';

export default function StatisticsPageContent() {
  const { isOpen: isOpenStatsWords, onOpen: onOpenStatsWords, onClose: onCloseStatsWords } = useDisclosure();

  const dispatch = useAppDispatch();
  
  const { data: user } = useGetUserInfoQuery();
  const { data: statistics, isFetching, isError, refetch } = useGetStatisticsQuery();
  dispatch(wordsAPI.util.prefetch('getAllWordsByStatus', { status: Status.KNOWN, page: 0, size: 20 }, { force: true }));

  useEffect(() => {
    refetch();
  }, []);

  if (isError) return <ErrorComponent />;

  const iconStyles = { width: '45px', height: '45px' };

  return (
    <Container>
      <Section>
        <HeadingTabletAndDesktop size={Size.LG}>Daily Streak</HeadingTabletAndDesktop>
        <CardsContainer>
          <SkeletonWrapper type={SkeletonType.STATS_CARD} fixed={2} isLoading={!statistics}>
            <StatsCard title="Current Streak" stat={statistics?.currentStreak} icon={<BsFire style={iconStyles} />} isRefreshing={isFetching} />
            <StatsCard title="Record Streak" stat={statistics?.recordStreak} icon={<ImFire style={iconStyles} />} isRefreshing={isFetching} />
          </SkeletonWrapper>
        </CardsContainer>
      </Section>
      <Section>
        <HeadingTabletAndDesktop size={Size.LG}>Vocabulary</HeadingTabletAndDesktop>
        <CardsContainer>
          <SkeletonWrapper type={SkeletonType.STATS_CARD} fixed={2} isLoading={!statistics}>
            <StatsCard title="Words Known" stat={statistics?.wordsKnown} icon={<PiBookThin style={iconStyles} />} isClickable onOpen={onOpenStatsWords} isRefreshing={isFetching} />
            {isOpenStatsWords && (<StatsWordsWindow isOpen={isOpenStatsWords} onClose={onCloseStatsWords} />)}
            {user?.role === RoleName.USER_CHINESE && (
              <StatsCard title="Characters Known" stat={statistics?.charactersKnown} icon={<PiBookThin style={iconStyles} />} isRefreshing={isFetching} />
            )}
          </SkeletonWrapper>
        </CardsContainer>
      </Section>
      <Section>
        <HeadingTabletAndDesktop size={Size.LG}>Daily Reviews</HeadingTabletAndDesktop>
        <CardsContainer>
          <SkeletonWrapper type={SkeletonType.STATS_CARD} fixed={3} isLoading={!statistics}>
            {statistics?.listOfReviewStatisticsDto && statistics.listOfReviewStatisticsDto.length > 0
              ? (statistics.listOfReviewStatisticsDto.map((reviewStatisticsDTO, index) => (
                <StatsReviewCard
                  key={index}
                  reviewStatistics={reviewStatisticsDTO}
                  isRefreshing={isFetching}
                />
              )))
              : <Text size={Size.LG}>You do not have any daily reviews</Text>}
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
