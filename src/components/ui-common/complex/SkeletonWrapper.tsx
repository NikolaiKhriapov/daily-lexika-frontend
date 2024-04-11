import React, { ReactNode, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Breakpoint } from '@utils/constants';
import { mediaBreakpointUp } from '@utils/functions';
import Skeleton, { SkeletonType } from '@components/ui-common/basic/Skeleton';
import Swiper, { SwiperSlide } from '@components/ui-common/complex/Swiper';

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
    [SkeletonType.TEXT_HEADING]: <Skeleton type={SkeletonType.TEXT_HEADING} />,
    [SkeletonType.DEFAULT]: <Skeleton type={SkeletonType.DEFAULT} />,
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

  const type = SkeletonType.REVIEW_CARD;

  const swiperElement = (cards: number) => (
    <Swiper>
      {[...Array(cards)].map((_, index) => (
        <SwiperSlide key={index}>
          <Skeleton type={type} />
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
        {[...Array(number)].map((_, index) => <Skeleton key={index} type={type} />)}
      </ContainerReviewsTabletAndDesktop>
    </>
  );
}

type WordPacksPageContentSkeletonProps = {
  number: number;
};

function WordPacksPageContentSkeleton(props: WordPacksPageContentSkeletonProps) {
  const { number } = props;

  const type = SkeletonType.WORD_PACK_CARD;

  const swiperElement = (cards: number) => (
    <Swiper>
      {[...Array(cards)].map((_, index) => (
        <SwiperSlide key={index}>
          <Skeleton type={type} />
        </SwiperSlide>
      ))}
    </Swiper>
  );

  return (
    <>
      <ContainerMobile>
        <Skeleton type={SkeletonType.TEXT_HEADING} />
        {swiperElement(number)}
        <Skeleton type={SkeletonType.TEXT_HEADING} />
        {swiperElement(number)}
        <Skeleton type={SkeletonType.TEXT_HEADING} />
        {swiperElement(1)}
      </ContainerMobile>
      <ContainerWordPacksTabletAndDesktop>
        <Skeleton type={SkeletonType.TEXT_HEADING} />
        {swiperElement(number)}
        <Skeleton type={SkeletonType.TEXT_HEADING} />
        {swiperElement(number)}
        <Skeleton type={SkeletonType.TEXT_HEADING} />
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

  const type = SkeletonType.STATS_CARD;

  return (
    <ContainerStatistics>
      {[...Array(number)].map((_, index) => <Skeleton key={index} type={type} />)}
    </ContainerStatistics>
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
