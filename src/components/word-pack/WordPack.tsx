import { useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import PageLayout from '../../shared/PageLayout';
import { errorNotification } from '../../services/popup-notification';
import WordPackCard from './WordPackCard';
import { getAllWordPacks } from '../../services/word-packs';
import { Category, WordPackDTO } from '../../utils/types';
import ErrorComponent from '../common/complex/ErrorComponent';
import Heading from '../common/basic/Heading';
import Spinner from '../common/basic/Spinner';
import IndexPageContainer from '../common/complex/IndexPageContainer';
import { Size } from '../../utils/constants';

export default function WordPack() {
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
    return <PageLayout><Spinner /></PageLayout>;
  }

  if (error) {
    return <ErrorComponent />;
  }

  if (allWordPacksDTO.length <= 0) {
    return (
      <PageLayout>
        <IndexPageContainer>
          <Heading size={Size.LG} isCentered>No Word Packs available</Heading>
        </IndexPageContainer>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <Container>
        {wordPackCategories.map((wordPackCategory) => (
          <Section key={wordPackCategory}>
            <Heading size={Size.LG}>{Category[wordPackCategory as keyof typeof Category]}</Heading>
            <WordPacksContainer>
              {wordPacksDTOByCategory(wordPackCategory).map((wordPackDTO) => (
                <WordPackCard
                  key={wordPackDTO.name}
                  wordPackDTO={wordPackDTO}
                  fetchAllWordPacksDTO={fetchAllWordPacksDTO}
                />
              ))}
            </WordPacksContainer>
          </Section>
        ))}
      </Container>
    </PageLayout>
  );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
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
