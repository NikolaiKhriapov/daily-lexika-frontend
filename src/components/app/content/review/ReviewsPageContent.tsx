import React from 'react';
import styled from 'styled-components';
import { useBreakpointValue } from '@chakra-ui/react';
import { useGetAllReviewsQuery } from '@store/api/reviewsAPI';
import { useGetWordOfTheDayQuery } from '@store/api/wordsAPI';
import { useAppDispatch, useAppSelector } from '@store/hooks/hooks';
import { setSlideUp } from '@store/reducers/app/reviewsPageTransitionSlice';
import { Breakpoint, Page, Size } from '@utils/constants';
import { mediaBreakpointUp } from '@utils/functions';
import FloatingArrowButton, { ArrowDirection } from '@components/app/content/review/FloatingArrowButton';
import ReviewCard from '@components/app/content/review/ReviewCard';
import WordOfTheDayComponent from '@components/app/navbar/app/word-of-the-day/WordOfTheDayComponent';
import Heading from '@components/ui-common/basic/Heading';
import Text from '@components/ui-common/basic/Text';
import ErrorComponent from '@components/ui-common/complex/ErrorComponent';
import IndexPageContainer from '@components/ui-common/complex/IndexPageContainer';
import SkeletonWrapper, { SkeletonType } from '@components/ui-common/complex/SkeletonWrapper';
import Swiper, { SwiperSlide } from '@components/ui-common/complex/Swiper';

export default function ReviewsPageContent() {
  const dispatch = useAppDispatch();
  const { slideUp, slideDown } = useAppSelector((state) => state.reviewsPageTransitionSlice);

  const { data: allReviews = [], isLoading: isLoadingAllReviews, isError } = useGetAllReviewsQuery(undefined, { refetchOnMountOrArgChange: true });
  useGetWordOfTheDayQuery(undefined, { refetchOnMountOrArgChange: true });

  const noReviewsText = useBreakpointValue({
    base: 'Get started by creating a daily review by clicking the button below',
    md: 'Get started by creating a daily review in the \'Word Packs\' section',
  });

  if (isLoadingAllReviews) return <SkeletonWrapper type={SkeletonType.REVIEW_CARD} isLoading={isLoadingAllReviews} fixed={7} />;
  if (isError) return <ErrorComponent />;

  const noReviewsComponent = (
    <IndexPageContainer>
      <Heading size={Size.LG} isCentered>You do not have any daily reviews</Heading>
      <Text size={Size.LG} isCentered>{noReviewsText}</Text>
      <Text />
    </IndexPageContainer>
  );

  return (
    <>
      <ContainerMobile className={slideUp ? 'slide-up-r' : slideDown ? 'slide-down-r' : ''}>
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
                <SwiperSlide>
                  <WordOfTheDayComponent />
                </SwiperSlide>
              </Swiper>
            )
        }
      </ContainerMobile>
      <MobileOnly>
        <FloatingArrowButton
          arrowDirection={ArrowDirection.DOWN}
          setAnimateTrue={() => dispatch(setSlideUp(true))}
          setAnimateFalse={() => dispatch(setSlideUp(false))}
          targetPage={Page.WORD_PACKS}
        />
      </MobileOnly>

      <ContainerTablet>
        {
          allReviews.length === 0
            ? noReviewsComponent
            : allReviews.map((reviewDTO) => <ReviewCard key={reviewDTO.id} review={reviewDTO} />)
        }
        {allReviews.length !== 0 && <WordOfTheDayComponent />}
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
  min-height: calc(100vh - 200px);

  &.slide-up-r {
    animation: slideUpR 0.3s forwards !important;
  }

  &.slide-down-r {
    animation: slideDownR 0.3s forwards !important;
  }

  @keyframes slideUpR {
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(-100%);
    }
  }

  @keyframes slideDownR {
    from {
      transform: translateY(-100%);
    }
    to {
      transform: translateY(0);
    }
  }
    
  ${mediaBreakpointUp(Breakpoint.TABLET)} {
    display: none;
  }
`;

const MobileOnly = styled.div`
  ${mediaBreakpointUp(Breakpoint.TABLET)} {
    display: none;
  }
`;

const ContainerTablet = styled.div`
  display: none;
    
  ${mediaBreakpointUp(Breakpoint.TABLET)} {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-content: baseline;
    gap: 40px;
    width: calc(100vw - 100px);
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
