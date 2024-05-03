import React from 'react';
import styled from 'styled-components';
import { useGetAllReviewsQuery } from '@store/api/reviewsAPI';
import { useGetWordOfTheDayQuery } from '@store/api/wordsAPI';
import { Breakpoint, Size } from '@utils/constants';
import { mediaBreakpointUp } from '@utils/functions';
import ReviewCard from '@components/app/content/review/ReviewCard';
import WordOfTheDayComponent from '@components/app/navbar/app/word-of-the-day/WordOfTheDayComponent';
import Heading from '@components/ui-common/basic/Heading';
import { SkeletonType } from '@components/ui-common/basic/Skeleton';
import Text from '@components/ui-common/basic/Text';
import ErrorComponent from '@components/ui-common/complex/ErrorComponent';
import IndexPageContainer from '@components/ui-common/complex/IndexPageContainer';
import SkeletonWrapper from '@components/ui-common/complex/SkeletonWrapper';
import Swiper, { SwiperSlide } from '@components/ui-common/complex/Swiper';

export default function ReviewsPageContent() {
  const { data: allReviews = [], isLoading: isLoadingAllReviews, isError } = useGetAllReviewsQuery(undefined, { refetchOnMountOrArgChange: true });
  useGetWordOfTheDayQuery(undefined, { refetchOnMountOrArgChange: true });

  if (isLoadingAllReviews) return <SkeletonWrapper type={SkeletonType.REVIEW_CARD} isLoading={isLoadingAllReviews} fixed={3} />;
  if (isError) return <ErrorComponent />;

  const noReviewsComponent = (
    <IndexPageContainer>
      <Heading size={Size.LG} isCentered>You do not have any daily reviews</Heading>
      <Text size={Size.LG} isCentered>{'Get started by creating a daily review in the \'Word Packs\' section'}</Text>
      <Text />
    </IndexPageContainer>
  );

  return (
    <>
      <ContainerMobile>
        {
          allReviews.length === 0
            ? noReviewsComponent
            : (
              <Swiper>
                {allReviews.map((reviewDTO) => (
                  <SwiperSlide key={reviewDTO.id}>
                    <ReviewCard review={reviewDTO} />
                  </SwiperSlide>
                ))}
              </Swiper>
            )
        }
        <WordOfTheDayComponent />
      </ContainerMobile>
      <ContainerTablet>
        <Section>
          {
            allReviews.length === 0
              ? noReviewsComponent
              : allReviews.map((reviewDTO) => <ReviewCard key={reviewDTO.id} review={reviewDTO} />)
          }
        </Section>
        <Section>
          <WordOfTheDayComponent />
        </Section>
      </ContainerTablet>
      <ContainerDesktop>
        {
          allReviews.length === 0
            ? noReviewsComponent
            : allReviews.map((reviewDTO) => <ReviewCard key={reviewDTO.id} review={reviewDTO} />)
        }
      </ContainerDesktop>
    </>
  );
}

const ContainerMobile = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: baseline;
  width: 100%;
  justify-content: center;
  gap: 30px;

  ${mediaBreakpointUp(Breakpoint.TABLET)} {
    display: none;
  }
`;

const ContainerTablet = styled.div`
  display: none;
    
  ${mediaBreakpointUp(Breakpoint.TABLET)} {
    display: flex;
    flex-direction: column;
    gap: 50px;
  }

  ${mediaBreakpointUp(Breakpoint.DESKTOP)} {
    display: none;
  }
`;

const ContainerDesktop = styled.div`
  display: none;
    
  ${mediaBreakpointUp(Breakpoint.DESKTOP)} {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-content: baseline;
    gap: 40px;
    width: calc(100vw - 100px);
  }
`;

const Section = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-content: baseline;
    gap: 40px;
    width: calc(100vw - 100px);
`;
