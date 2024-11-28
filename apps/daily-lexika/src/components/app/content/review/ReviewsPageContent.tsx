import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { useBreakpointValue } from '@chakra-ui/react';
import FloatingArrowButton, { ArrowDirection } from '@daily-lexika/components/app/content/review/FloatingArrowButton';
import ReviewCard from '@daily-lexika/components/app/content/review/ReviewCard';
import WordOfTheDayComponent from '@daily-lexika/components/app/navbar/word-of-the-day/WordOfTheDayComponent';
import { SkeletonType, SkeletonWrapper } from '@daily-lexika/components/ui/SkeletonWrapper';
import { useGetAllReviewsQuery } from '@daily-lexika/store/api/reviewsAPI';
import { useGetAllWordPacksQuery } from '@daily-lexika/store/api/wordPacksAPI';
import { useGetWordOfTheDayQuery } from '@daily-lexika/store/api/wordsAPI';
import { useAppDispatch, useAppSelector } from '@daily-lexika/store/hooks/hooks';
import { setSlideUp } from '@daily-lexika/store/reducers/reviewsPageTransitionSlice';
import { Page } from '@daily-lexika/utils/Pages';
import {
  ErrorComponent, Heading, IndexPageContainer, Swiper, SwiperSlide, Text
} from '@library/shared/ui';
import { Breakpoint, mediaBreakpointUp,Size } from '@library/shared/utils';

export default function ReviewsPageContent() {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { slideUp, slideDown } = useAppSelector((state) => state.reviewsPageTransitionSlice);
  const { data: allReviews = [], isLoading: isLoadingAllReviews, isError } = useGetAllReviewsQuery(undefined, { refetchOnMountOrArgChange: true });
  const { data: allWordPacks } = useGetAllWordPacksQuery();
  useGetWordOfTheDayQuery(undefined, { refetchOnMountOrArgChange: true });

  const noReviewsText = useBreakpointValue({
    base: t('ReviewsPage.noReviews.text.base'),
    md: t('ReviewsPage.noReviews.text.md'),
  });

  if (isLoadingAllReviews) return <SkeletonWrapper type={SkeletonType.REVIEW_CARD} isLoading={isLoadingAllReviews} fixed={7} />;
  if (isError) return <ErrorComponent />;

  const noReviewsComponent = (
    <IndexPageContainer>
      <Heading size={Size.LG} isCentered>{t('ReviewsPage.noReviews.heading')}</Heading>
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
      {allWordPacks && (
        <MobileOnly>
          <FloatingArrowButton
            arrowDirection={ArrowDirection.DOWN}
            setAnimateTrue={() => dispatch(setSlideUp(true))}
            setAnimateFalse={() => dispatch(setSlideUp(false))}
            targetPage={Page.WORD_PACKS}
          />
        </MobileOnly>
      )}

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
