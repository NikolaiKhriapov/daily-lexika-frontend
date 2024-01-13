import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getAllReviews } from '@services/reviews';
import { Size } from '@utils/constants';
import { ReviewDTO } from '@utils/types';
import Heading from '@components/common/basic/Heading';
import Spinner from '@components/common/basic/Spinner';
import Text from '@components/common/basic/Text';
import ErrorComponent from '@components/common/complex/ErrorComponent';
import IndexPageContainer from '@components/common/complex/IndexPageContainer';
import ReviewCard from '@components/review/ReviewCard';

export default function ReviewsPageContent() {
  const [allReviewsDTO, setAllReviewsDTO] = useState<ReviewDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchAllReviewsDTO = () => {
    setLoading(true);
    getAllReviews()
      .then((response) => {
        const data: ReviewDTO[] = response?.data.data.allReviewsDTO;
        setAllReviewsDTO(data.sort((a, b) => a.wordPackName.localeCompare(b.wordPackName)));
      })
      .catch((e) => {
        setError(e.response.data.message);
        console.error(e.code, e.response.data.message);
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
