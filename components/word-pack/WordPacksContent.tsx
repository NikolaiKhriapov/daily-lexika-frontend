import { useEffect, useState } from 'react';
import styled from 'styled-components';
import WordPackCard from './WordPackCard';
import ErrorComponent from '../common/complex/ErrorComponent';
import Heading from '../common/basic/Heading';
import Spinner from '../common/basic/Spinner';
import IndexPageContainer from '../common/complex/IndexPageContainer';
import { Category, WordPackDTO } from '../../src/utils/types';
import { getAllWordPacks } from '../../src/services/word-packs';
import { errorNotification } from '../../src/services/popup-notification';
import { Size } from '../../src/utils/constants';

export default function WordPacksContent() {
  const [allWordPacksDTO, setAllWordPacksDTO] = useState<WordPackDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchAllWordPacksDTO = () => {
    setLoading(true);
    getAllWordPacks()
      .then((response) => setAllWordPacksDTO(response.data.data.allWordPacksDTO))
      .catch((e) => {
        setError((e.response.data.message));
        errorNotification(e.code, e.response.data.message);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchAllWordPacksDTO();
  }, []);

  const wordPackCategories = Array.from(new Set(allWordPacksDTO.map((wordPackDTO) => wordPackDTO.category)));
  const wordPacksDTOByCategory = (category: Category) => allWordPacksDTO
    .filter((wordPackDTO) => wordPackDTO.category === category);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <ErrorComponent />;
  }

  if (allWordPacksDTO.length <= 0) {
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
