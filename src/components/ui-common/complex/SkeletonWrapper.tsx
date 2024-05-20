import React, { ReactNode, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Breakpoint } from '@utils/constants';
import { mediaBreakpointUp } from '@utils/functions';
import Skeleton from '@components/ui-common/basic/Skeleton';
import Swiper, { SwiperSlide } from '@components/ui-common/complex/Swiper';

export enum SkeletonType {
  REVIEW_CARD = 'REVIEW_CARD',
  WORD_PACK_CARD = 'WORD_PACK_CARD',
  STATS_CARD = 'STATS_CARD',
  TEXT_HEADING = 'TEXT_HEADING',
  WORDS_SCROLLABLE_CONTAINER = 'WORDS_SCROLLABLE_CONTAINER',
  WORD_STREAK_STATS = 'WORD_STREAK_STATS',
}

type Props = {
  children?: ReactNode;
  type: SkeletonType;
  fixed?: number | null;
  isLoading: boolean;
};

export default function SkeletonWrapper(props: Props) {
  const { children, type, fixed = null, isLoading } = props;

  const [number, setNumber] = useState(1);

  useEffect(() => {
    if (fixed) {
      setNumber(fixed);
    } else {
      setTimeout(() => {
        setNumber(number + 1);
        if (number === 3) {
          setNumber(1);
        }
      }, 500);
    }
  }, [number]);

  const skeletonComponent = {
    [SkeletonType.REVIEW_CARD]: <ReviewsPageContentSkeleton number={number} />,
    [SkeletonType.WORD_PACK_CARD]: <WordPacksPageContentSkeleton number={number} />,
    [SkeletonType.STATS_CARD]: <StatisticsPageContentSkeleton number={number} />,
    [SkeletonType.TEXT_HEADING]: <Skeleton height={5} width={215} />,
    [SkeletonType.WORDS_SCROLLABLE_CONTAINER]: <WordsScrollableContainerSkeleton />,
    [SkeletonType.WORD_STREAK_STATS]: <Skeleton height='40px' width='150px' />,
  };

  return (
    <>
      {
        isLoading
          ? skeletonComponent[type]
          : children
      }
    </>
  );
}

type ReviewsPageContentSkeletonProps = {
  number: number;
};

function ReviewsPageContentSkeleton(props: ReviewsPageContentSkeletonProps) {
  const { number } = props;

  const swiperElement = (cards: number) => (
    <Swiper>
      {[...Array(cards)].map((_, index) => (
        <SwiperSlide key={index}>
          <Skeleton height={280} width={215} />
        </SwiperSlide>
      ))}
    </Swiper>
  );

  return (
    <>
      <ContainerMobile>
        {swiperElement(number)}
      </ContainerMobile>
      <ContainerReviewsTabletAndDesktop>
        {[...Array(number)].map((_, index) => (
          <Skeleton key={index} height={280} width={215} />
        ))}
      </ContainerReviewsTabletAndDesktop>
    </>
  );
}

type WordPacksPageContentSkeletonProps = {
  number: number;
};

function WordPacksPageContentSkeleton(props: WordPacksPageContentSkeletonProps) {
  const { number } = props;

  const swiperElement = (cards: number) => (
    <Swiper>
      {[...Array(cards)].map((_, index) => (
        <SwiperSlide key={index}>
          <Skeleton key={index} height={280} width={215} />
        </SwiperSlide>
      ))}
    </Swiper>
  );

  return (
    <>
      <ContainerMobile>
        {swiperElement(number)}
        {swiperElement(number)}
      </ContainerMobile>
      <ContainerWordPacksTabletAndDesktop>
        <Skeleton height={5} width={215} />
        {swiperElement(number)}
        <Skeleton height={5} width={215} />
        {swiperElement(number)}
        <Skeleton height={5} width={215} />
        {swiperElement(1)}
      </ContainerWordPacksTabletAndDesktop>
    </>
  );
}

type StatisticsPageContentSkeletonProps = {
  number: number;
};

function StatisticsPageContentSkeleton(props: StatisticsPageContentSkeletonProps) {
  const { number } = props;

  return (
    <ContainerStatistics>
      {[...Array(number)].map((_, index) => <Skeleton key={index} height={100} width={220} />)}
    </ContainerStatistics>
  );
}

function WordsScrollableContainerSkeleton() {
  const number = 10;

  return (
    <ContainerWordsScrollable>
      {[...Array(number)].map((_, index) => <Skeleton key={index} height='65px' width='auto' />)}
    </ContainerWordsScrollable>
  );
}

const ContainerMobile = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-content: baseline;
  gap: 30px;

  ${mediaBreakpointUp(Breakpoint.TABLET)} {
    display: none;
  }
`;

const ContainerReviewsTabletAndDesktop = styled.div`
  display: none;

  ${mediaBreakpointUp(Breakpoint.TABLET)} {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-content: baseline;
    gap: 40px;
  }
`;

const ContainerWordPacksTabletAndDesktop = styled.div`
  display: none;

  ${mediaBreakpointUp(Breakpoint.TABLET)} {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-items: center;
    align-content: baseline;
    gap: 30px;
    width: 100%;
  }
`;

const ContainerStatistics = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-content: baseline;
  gap: 40px;
`;

const ContainerWordsScrollable = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 60vh;
  width: 100%;
  overflow-x: hidden;

  ${mediaBreakpointUp(Breakpoint.TABLET)} {
    width: 500px;
  }
`;
