import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import FloatingArrowButton, { ArrowDirection } from '@daily-lexika/components/app/content/review/FloatingArrowButton';
import FloatingPlusButton from '@daily-lexika/components/app/content/word-pack/FloatingPlusButton';
import WordPackCard from '@daily-lexika/components/app/content/word-pack/WordPackCard';
import I18nHelper from '@daily-lexika/helpers/I18nHelper';
import { useGetAllReviewsQuery } from '@daily-lexika/store/api/reviewsAPI';
import { useGetAllWordPacksQuery } from '@daily-lexika/store/api/wordPacksAPI';
import { useAppDispatch, useAppSelector } from '@daily-lexika/store/hooks/hooks';
import { setSlideDown } from '@daily-lexika/store/reducers/reviewsPageTransitionSlice';
import { Page } from '@daily-lexika/utils/Pages';
import { Category } from '@library/daily-lexika';
import {
  ErrorComponent, Heading, IndexPageContainer, SkeletonType, SkeletonWrapper, Swiper, SwiperSlide
} from '@library/shared/ui';
import { Breakpoint, mediaBreakpointUp,Size  } from '@library/shared/utils';

export default function WordPacksPageContent() {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { slideUp, slideDown } = useAppSelector((state) => state.reviewsPageTransitionSlice);
  const { data: allWordPacks = [], isLoading, isError } = useGetAllWordPacksQuery();
  const { data: allReviews } = useGetAllReviewsQuery();

  const wordPackCategories = Array.from(new Set(allWordPacks.map((wordPackDto) => wordPackDto.category)));
  const wordPacksDtoByCategory = (category: Category) => allWordPacks
    .filter((wordPackDto) => wordPackDto.category.toLowerCase() === category.toLowerCase());
  const wordPackCategoriesStandard = wordPackCategories
    .filter((wordPackCategory) => wordPackCategory.toLowerCase() !== Category.CUSTOM.toLowerCase());

  if (isLoading) return <SkeletonWrapper type={SkeletonType.WORD_PACK_CARD} isLoading={isLoading} fixed={7} />;
  if (isError) return <ErrorComponent />;

  if (!allWordPacks || allWordPacks.length === 0) {
    return (
      <IndexPageContainer>
        <Heading size={Size.LG} isCentered>{t('WordPackPage.noWordPacks')}</Heading>
      </IndexPageContainer>
    );
  }

  return (
    <>
      <Container className={slideUp ? 'slide-up-wp' : slideDown ? 'slide-down-wp' : ''}>
        {wordPackCategoriesStandard.map((category) => (
          <Section key={category}>
            <HeadingContainer>
              <Heading size={Size.LG} isCentered>{I18nHelper.getWordPackCategoryTranslated(category, t)}</Heading>
            </HeadingContainer>
            <Swiper>
              {wordPacksDtoByCategory(category).map((wordPackDto) => (
                <SwiperSlide key={wordPackDto.name}>
                  <WordPackCard wordPack={wordPackDto} />
                </SwiperSlide>
              ))}
            </Swiper>
          </Section>
        ))}
        {wordPacksDtoByCategory(Category.CUSTOM).length > 0 && (
          <Section>
            <HeadingContainer>
              <Heading size={Size.LG} isCentered>{I18nHelper.getWordPackCategoryTranslated(Category.CUSTOM, t)}</Heading>
            </HeadingContainer>
            <Swiper>
              {wordPacksDtoByCategory(Category.CUSTOM).map((wordPackDto) => (
                <SwiperSlide key={wordPackDto.name}>
                  <WordPackCard wordPack={wordPackDto} />
                </SwiperSlide>
              ))}
            </Swiper>
          </Section>
        )}
      </Container>
      {allReviews && (
        <ContainerMobile>
          <FloatingArrowButton
            arrowDirection={ArrowDirection.UP}
            setAnimateTrue={() => dispatch(setSlideDown(true))}
            setAnimateFalse={() => dispatch(setSlideDown(false))}
            targetPage={Page.REVIEWS}
            order={2}
          />
        </ContainerMobile>
      )}
      <FloatingPlusButton />
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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  align-content: baseline;
  gap: 30px;
  width: 100%;

  &.slide-up-wp {
    animation: slideUpWp 0.3s forwards !important;
  }

  &.slide-down-wp {
    animation: slideDownWp 0.3s forwards !important;
  }

  @keyframes slideUpWp {
    from {
      transform: translateY(100%);
    }
    to {
      transform: translateY(0);
    }
  }

  @keyframes slideDownWp {
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(100%);
    }
  }

  ${mediaBreakpointUp(Breakpoint.TABLET)} {
    width: calc(100vw - 100px);
    animation: none;
  }

  ${mediaBreakpointUp(Breakpoint.DESKTOP)} {
    width: 100%;
  }
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: calc(100vw - 80px);

  ${mediaBreakpointUp(Breakpoint.TABLET)} {
    width: calc(100vw - 100px);
  }

  ${mediaBreakpointUp(Breakpoint.DESKTOP)} {
    width: 100%;
  }
`;

const HeadingContainer = styled.div`
  display: none;

  ${mediaBreakpointUp(Breakpoint.TABLET)} {
    display: flex;
    justify-content: center;
  }
`;
