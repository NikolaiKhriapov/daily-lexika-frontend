import React from 'react';
import styled from 'styled-components';
import { useGetAllWordPacksQuery } from '@store/api/wordPacksAPI';
import { Breakpoint, Size } from '@utils/constants';
import { mediaBreakpointUp } from '@utils/functions';
import { Category } from '@utils/types';
import FloatingPlus from '@components/app/content/word-pack/floating-plus/FloatingPlus';
import WordPackCard from '@components/app/content/word-pack/WordPackCard';
import Heading from '@components/ui-common/basic/Heading';
import ErrorComponent from '@components/ui-common/complex/ErrorComponent';
import IndexPageContainer from '@components/ui-common/complex/IndexPageContainer';
import SkeletonWrapper, { SkeletonType } from '@components/ui-common/complex/SkeletonWrapper';
import Swiper, { SwiperSlide } from '@components/ui-common/complex/Swiper';

export default function WordPacksPageContent() {
  const { data: allWordPacks = [], isLoading, isError } = useGetAllWordPacksQuery();

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
        <Heading size={Size.LG} isCentered>No Word Packs available</Heading>
      </IndexPageContainer>
    );
  }

  return (
    <Container>
      {wordPackCategoriesStandard.map((wordPackCategory) => (
        <Section key={wordPackCategory}>
          <HeadingContainer>
            <Heading size={Size.LG} isCentered>{Category[wordPackCategory as keyof typeof Category]}</Heading>
          </HeadingContainer>
          <Swiper>
            {wordPacksDtoByCategory(wordPackCategory).map((wordPackDto) => (
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
            <Heading size={Size.LG} isCentered>Custom</Heading>
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
      <FloatingPlus />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  align-content: baseline;
  gap: 30px;
  width: 100%;
  
  ${mediaBreakpointUp(Breakpoint.TABLET)} {
    width: calc(100vw - 100px);
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
