import React from 'react';
import { BsFire } from 'react-icons/bs';
import { GiYinYang } from 'react-icons/gi';
import { ImFire } from 'react-icons/im';
import styled from 'styled-components';
import { useDisclosure } from '@chakra-ui/react';
import { useGetStatisticsQuery } from '@store/api/statisticsAPI';
import { useGetUserInfoQuery } from '@store/api/userAPI';
import { RoleName, Size } from '@utils/constants';
import Heading from '@components/common/basic/Heading';
import Spinner from '@components/common/basic/Spinner';
import Text from '@components/common/basic/Text';
import ErrorComponent from '@components/common/complex/ErrorComponent';
import StatsCard from '@components/statistics/StatsCard';
import StatsReviewCard from '@components/statistics/StatsReviewCard';
import StatsWordsWindow from '@components/statistics/StatsWordsWindow';

export default function StatisticsPageContent() {
  const { isOpen: isOpenStatsWords, onOpen: onOpenStatsWords, onClose: onCloseStatsWords } = useDisclosure();

  const { data: user } = useGetUserInfoQuery();
  const { data: statistics, isLoading, isError } = useGetStatisticsQuery();

  if (isLoading || !statistics || !user) return <Spinner />;
  if (isError) return <ErrorComponent />;

  const iconStyles = { width: '45px', height: '45px' };

  return (
    <Container>
      <Section>
        <Heading size={Size.LG}>Daily Streak</Heading>
        <CardsContainer>
          <StatsCard title="Current Streak" stat={statistics.currentStreak} icon={<BsFire style={iconStyles} />} />
          <StatsCard title="Record Streak" stat={statistics.recordStreak} icon={<ImFire style={iconStyles} />} />
        </CardsContainer>
      </Section>
      <Section>
        <Heading size={Size.LG}>Vocabulary</Heading>
        <CardsContainer>
          <StatsCard title="Words Known" stat={statistics.wordsKnown} icon={<GiYinYang style={iconStyles} />} isClickable onOpen={onOpenStatsWords} />
          {isOpenStatsWords && (<StatsWordsWindow isOpen={isOpenStatsWords} onClose={onCloseStatsWords} />)}
          {user?.role === RoleName.USER_CHINESE && (
            <StatsCard title="Characters Known" stat={statistics.charactersKnown} icon={<GiYinYang style={iconStyles} />} />
          )}
          <StatsCard title="Idioms Known" icon={<GiYinYang style={iconStyles} />} />
        </CardsContainer>
      </Section>
      <Section>
        <Heading size={Size.LG}>Daily Reviews</Heading>
        <CardsContainer>
          {statistics.listOfReviewStatisticsDTO && statistics.listOfReviewStatisticsDTO.length > 0
            ? (statistics.listOfReviewStatisticsDTO.map((reviewStatisticsDTO, index) => (
              <StatsReviewCard
                key={index}
                reviewStatistics={reviewStatisticsDTO}
              />
            )))
            : <Text size={Size.LG}>You do not have any daily reviews</Text>}
        </CardsContainer>
      </Section>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
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
