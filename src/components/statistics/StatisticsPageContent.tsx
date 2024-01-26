import { useEffect, useState } from 'react';
import { BsFire } from 'react-icons/bs';
import { GiYinYang } from 'react-icons/gi';
import { ImFire } from 'react-icons/im';
import styled from 'styled-components';
import { getStatistics } from '@services/statistics';
import { Size } from '@utils/constants';
import { StatisticsDTO } from '@utils/types';
import Heading from '@components/common/basic/Heading';
import Spinner from '@components/common/basic/Spinner';
import Text from '@components/common/basic/Text';
import ErrorComponent from '@components/common/complex/ErrorComponent';
import StatsCard from '@components/review/StatsCard';
import StatsReviewCard from '@components/review/StatsReviewCard';

export default function StatisticsPageContent() {
  const [statisticsDTO, setStatisticsDTO] = useState<StatisticsDTO>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchStatisticsDTO = () => {
    setLoading(true);
    getStatistics()
      .then((response) => setStatisticsDTO(response.data))
      .catch((e) => {
        setError((e.response.data.message));
        console.error(e.code, e.response.data.message);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchStatisticsDTO();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <ErrorComponent />;
  }

  return (
    <Container>
      <Section>
        <Heading size={Size.LG}>Daily Streak</Heading>
        <CardsContainer>
          <StatsCard title="Current Streak" stat={statisticsDTO?.currentStreak} icon={<BsFire size="45px" style={{ width: '45px', height: '45px' }} />} />
          <StatsCard title="Record Streak" stat={statisticsDTO?.recordStreak} icon={<ImFire size="45px" style={{ width: '45px', height: '45px' }} />} />
        </CardsContainer>
      </Section>
      <Section>
        <Heading size={Size.LG}>Vocabulary</Heading>
        <CardsContainer>
          <StatsCard title="Words Known" stat={statisticsDTO?.wordsKnown} icon={<GiYinYang size="45px" style={{ width: '45px', height: '45px' }} />} />
          <StatsCard title="Characters Known" icon={<GiYinYang size="45px" style={{ width: '45px', height: '45px' }} />} />
          <StatsCard title="Idioms Known" icon={<GiYinYang size="45px" style={{ width: '45px', height: '45px' }} />} />
        </CardsContainer>
      </Section>
      <Section>
        <Heading size={Size.LG}>Daily Reviews</Heading>
        <CardsContainer>
          {statisticsDTO?.listOfReviewStatisticsDTO && statisticsDTO?.listOfReviewStatisticsDTO.length > 0
            ? (statisticsDTO?.listOfReviewStatisticsDTO.map((reviewStatisticsDTO, index) => (
              <StatsReviewCard
                key={index}
                reviewStatisticsDTO={reviewStatisticsDTO}
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
