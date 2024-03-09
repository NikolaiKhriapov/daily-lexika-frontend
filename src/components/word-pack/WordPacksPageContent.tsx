import React from 'react';
import styled from 'styled-components';
import { useGetAllWordPacksQuery } from '@store/api/wordPacksAPI';
import { Breakpoint, Size } from '@utils/constants';
import { mediaBreakpointUp } from '@utils/functions';
import { Category } from '@utils/types';
import Heading from '@components/common/basic/Heading';
import { SkeletonType } from '@components/common/basic/Skeleton';
import Swiper, { SwiperSlide } from '@components/common/basic/Swiper';
import ErrorComponent from '@components/common/complex/ErrorComponent';
import IndexPageContainer from '@components/common/complex/IndexPageContainer';
import SkeletonWrapper from '@components/common/complex/SkeletonWrapper';
import WordPackCard from '@components/word-pack/WordPackCard';
import WordPackCardAddNew from '@components/word-pack/WordPackCardAddNew';

export default function WordPacksPageContent() {
  const { data: allWordPacks = [], isLoading, isError } = useGetAllWordPacksQuery();

  const wordPackCategories = Array.from(new Set(allWordPacks.map((wordPackDto) => wordPackDto.category)));
  const wordPacksDtoByCategory = (category: Category) => allWordPacks
    .filter((wordPackDto) => wordPackDto.category.toLowerCase() === category.toLowerCase());
  const wordPackCategoriesStandard = wordPackCategories
    .filter((wordPackCategory) => wordPackCategory.toLowerCase() !== Category.CUSTOM.toLowerCase());

  if (isLoading) return <SkeletonWrapper type={SkeletonType.WORD_PACK_CARD} isLoading={isLoading} fixed={3} />;
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
          <Heading size={Size.LG} isCentered>{Category[wordPackCategory as keyof typeof Category]}</Heading>
          <Swiper>
            {wordPacksDtoByCategory(wordPackCategory).map((wordPackDto) => (
              <SwiperSlide key={wordPackDto.name}>
                <WordPackCard wordPack={wordPackDto} />
              </SwiperSlide>
            ))}
          </Swiper>
        </Section>
      ))}
      <Section>
        <Heading size={Size.LG} isCentered>Custom Word Packs</Heading>
        <Swiper>
          {wordPacksDtoByCategory(Category.CUSTOM).map((wordPackDto) => (
            <SwiperSlide key={wordPackDto.name}>
              <WordPackCard wordPack={wordPackDto} />
            </SwiperSlide>
          ))}
          <SwiperSlide key='add-new'>
            <WordPackCardAddNew />
          </SwiperSlide>
        </Swiper>
      </Section>
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
  width: calc(100vw - 80px);
  
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
