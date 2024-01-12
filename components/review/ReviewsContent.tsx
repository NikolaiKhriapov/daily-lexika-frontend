import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { errorNotification } from '../../src/services/popup-notification';
import { getAllReviews } from '../../src/services/reviews';
import { ReviewDTO } from '../../src/utils/types';
import ErrorComponent from '../common/complex/ErrorComponent';
import Spinner from '../common/basic/Spinner';
import Heading from '../common/basic/Heading';
import ReviewCard from './ReviewCard';
import IndexPageContainer from '../common/complex/IndexPageContainer';
import Text from '../common/basic/Text';
import { Size } from '../../src/utils/constants';

export default function ReviewsContent() {
  const [allReviewsDTO, setAllReviewsDTO] = useState<ReviewDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchAllReviewsDTO = () => {
    setLoading(true);
    getAllReviews()
      .then((response) => {
        const data: ReviewDTO[] = response.data.data.allReviewsDTO;
        setAllReviewsDTO(data.sort((a, b) => a.wordPackName.localeCompare(b.wordPackName)));
      })
      .catch((e) => {
        setError(e.response.data.message);
        errorNotification(e.code, e.response.data.message);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchAllReviewsDTO();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <ErrorComponent />;
  }

  if (allReviewsDTO.length <= 0) {
    return (
      <IndexPageContainer>
        <Heading size={Size.LG} isCentered>You do not have any daily reviews</Heading>
        <Text size={Size.LG} isCentered>
          Add a word pack to create a daily review and start growing your vocabulary
        </Text>
      </IndexPageContainer>
    );
  }

  return (
    <Container>
      {allReviewsDTO.map((reviewDTO) => (
        <ReviewCard
          key={reviewDTO.id}
          reviewDTO={reviewDTO}
          fetchAllReviewsDTO={fetchAllReviewsDTO}
        />
      ))}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-content: baseline;
  gap: 40px;
`;
