import { BsFire } from 'react-icons/bs';
import { ImFire } from 'react-icons/im';
import { GiYinYang } from 'react-icons/gi';
import { useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import StatsCard from '../review/StatsCard';
import { errorNotification } from '../../services/popup-notification';
import { getStatistics } from '../../services/user';
import StatsReviewCard from '../review/StatsReviewCard';
import { StatisticsDTO } from '../../utils/types';
import PageLayout from '../../shared/PageLayout';
import ErrorComponent from '../common/complex/ErrorComponent';
import Spinner from '../common/basic/Spinner';
import Heading from '../common/basic/Heading';
import Text from '../common/basic/Text';
import { Size } from '../../utils/constants';

export default function Statistics() {
  const [statisticsDTO, setStatisticsDTO] = useState<StatisticsDTO>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchStatisticsDTO = () => {
    setLoading(true);
    getStatistics()
      .then((response) => setStatisticsDTO(response.data.data.statisticsDTO))
      .catch((e) => {
        setError((e.response.data.message));
        errorNotification(e.code, e.response.data.message);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchStatisticsDTO();
  }, []);

  if (loading) {
    return <PageLayout><Spinner /></PageLayout>;
  }

  if (error) {
    return <ErrorComponent />;
  }

  return (
    <PageLayout>
      <StatisticsContainer>
        <Section>
          <Heading size={Size.LG}>Daily Streak</Heading>
          <CardsContainer>
            <StatsCard title='Current Streak' stat={statisticsDTO?.currentStreak} icon={<BsFire size='45px' />} />
            <StatsCard title='Record Streak' stat={statisticsDTO?.recordStreak} icon={<ImFire size='45px' />} />
          </CardsContainer>
        </Section>
        <Section>
          <Heading size={Size.LG}>Vocabulary</Heading>
          <CardsContainer>
            <StatsCard title='Words Known' stat={statisticsDTO?.wordsKnown} icon={<GiYinYang size='45px' />} />
            <StatsCard title='Characters Known' icon={<GiYinYang size='45px' />} />
            <StatsCard title='Idioms Known' icon={<GiYinYang size='45px' />} />
          </CardsContainer>
        </Section>
        <Section>
          <Heading size={Size.LG}>Daily Reviews</Heading>
          <CardsContainer>
            {statisticsDTO?.listOfReviewStatisticsDTO && statisticsDTO?.listOfReviewStatisticsDTO.length > 0
              ? (statisticsDTO?.listOfReviewStatisticsDTO.map((reviewStatisticsDTO) => (
                <StatsReviewCard
                  key={reviewStatisticsDTO.id}
                  reviewStatisticsDTO={reviewStatisticsDTO}
                />
              )))
              : <Text size={Size.LG}>You do not have any daily reviews</Text>}
          </CardsContainer>
        </Section>
      </StatisticsContainer>
    </PageLayout>
  );
}

const StatisticsContainer = styled.div`
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
