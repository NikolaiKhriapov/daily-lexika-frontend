import React from 'react';
import styled from 'styled-components';
import { useGetAllWordPacksQuery } from '@store/api/wordPacksAPI';
import { Size } from '@utils/constants';
import { Category } from '@utils/types';
import Heading from '@components/common/basic/Heading';
import { SkeletonType } from '@components/common/basic/Skeleton';
import ErrorComponent from '@components/common/complex/ErrorComponent';
import IndexPageContainer from '@components/common/complex/IndexPageContainer';
import SkeletonWrapper from '@components/common/complex/SkeletonWrapper';
import WordPackCard from '@components/word-pack/WordPackCard';
import WordPackCardAddNew from '@components/word-pack/WordPackCardAddNew';

export default function WordPacksPageContent() {
  const { data: allWordPacks = [], isLoading, isError } = useGetAllWordPacksQuery();

  const wordPackCategories = Array.from(new Set(allWordPacks.map((wordPackDTO) => wordPackDTO.category)));
  const wordPacksDTOByCategory = (category: Category) => allWordPacks
    .filter((wordPackDTO) => wordPackDTO.category.toLowerCase() === category.toLowerCase());
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
          <WordPacksContainer>
            {wordPacksDTOByCategory(wordPackCategory).map((wordPackDTO) => (
              <WordPackCard
                key={wordPackDTO.name}
                wordPack={wordPackDTO}
              />
            ))}
          </WordPacksContainer>
        </Section>
      ))}
      <Section>
        <Heading size={Size.LG} isCentered>Custom Word Packs</Heading>
        <WordPacksContainer>
          {wordPacksDTOByCategory(Category.CUSTOM).map((wordPackDTO) => (
            <WordPackCard
              key={wordPackDTO.name}
              wordPack={wordPackDTO}
            />
          ))}
          <WordPackCardAddNew />
        </WordPacksContainer>
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
  gap: 40px;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const WordPacksContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 40px;
`;
