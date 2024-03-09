import React from 'react';
import styled from 'styled-components';
import { useGetAllReviewsQuery } from '@store/api/reviewsAPI';
import { Breakpoint, Size } from '@utils/constants';
import { mediaBreakpointUp } from '@utils/functions';
import Heading from '@components/common/basic/Heading';
import { SkeletonType } from '@components/common/basic/Skeleton';
import Text from '@components/common/basic/Text';
import ErrorComponent from '@components/common/complex/ErrorComponent';
import IndexPageContainer from '@components/common/complex/IndexPageContainer';
import SkeletonWrapper from '@components/common/complex/SkeletonWrapper';
import ReviewCard from '@components/review/ReviewCard';

export default function ReviewsPageContent() {
  const { data: allReviews = [], isLoading, isError } = useGetAllReviewsQuery();

  if (isLoading) return <SkeletonWrapper type={SkeletonType.REVIEW_CARD} isLoading={isLoading} fixed={3} />;
  if (isError) return <ErrorComponent />;

  if (allReviews.length === 0) {
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
      {allReviews.map((reviewDTO) => (
        <ReviewCard
          key={reviewDTO.id}
          review={reviewDTO}
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
  width: calc(100vw - 80px);

  ${mediaBreakpointUp(Breakpoint.TABLET)} {
    width: calc(100vw - 100px);
  }
`;
