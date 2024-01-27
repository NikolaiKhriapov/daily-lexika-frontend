import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getAllWordPacks } from '@services/word-packs';
import { Size } from '@utils/constants';
import { Category, WordPackDTO } from '@utils/types';
import Heading from '@components/common/basic/Heading';
import Spinner from '@components/common/basic/Spinner';
import ErrorComponent from '@components/common/complex/ErrorComponent';
import IndexPageContainer from '@components/common/complex/IndexPageContainer';
import WordPackCard from '@components/word-pack/WordPackCard';

export default function WordPacksPageContent() {
  const [allWordPacksDTO, setAllWordPacksDTO] = useState<WordPackDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchAllWordPacksDTO = () => {
    setLoading(true);
    getAllWordPacks()
      .then((response) => {
        const allWordPacksDTO = response.data;
        const notEmptyWordPacksDTO = allWordPacksDTO.filter((wordPackDTO) => wordPackDTO.totalWords > 0);
        setAllWordPacksDTO(notEmptyWordPacksDTO);
      })
      .catch((e) => {
        setError((e.response.data.message));
        console.error(e.code, e.response.data.message);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchAllWordPacksDTO();
  }, []);

  const wordPackCategories = Array.from(new Set(allWordPacksDTO?.map((wordPackDTO) => wordPackDTO.category)));
  const wordPacksDTOByCategory = (category: Category) => allWordPacksDTO
    .filter((wordPackDTO) => wordPackDTO.category === category);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <ErrorComponent />;
  }

  if (allWordPacksDTO?.length <= 0) {
    return (
      <IndexPageContainer>
        <Heading size={Size.LG} isCentered>No Word Packs available</Heading>
      </IndexPageContainer>
    );
  }

  return (
    <Container>
      {wordPackCategories.map((wordPackCategory) => (
        <Section key={wordPackCategory}>
          <Heading size={Size.LG}>{Category[wordPackCategory as keyof typeof Category]}</Heading>
          <WordPacksContainer>
            {wordPacksDTOByCategory(wordPackCategory).map((wordPackDTO) => (
              <WordPackCard
                key={wordPackDTO.name}
                wordPackDTO={wordPackDTO}
              />
            ))}
          </WordPacksContainer>
        </Section>
      ))}
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
