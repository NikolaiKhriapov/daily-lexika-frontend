import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useColorMode, useDisclosure } from '@chakra-ui/react';
import { getAllWordPacks } from '@services/word-packs';
import { Size } from '@utils/constants';
import { theme } from '@utils/theme';
import { Category, WordPackDTO } from '@utils/types';
import Heading from '@components/common/basic/Heading';
import Spinner from '@components/common/basic/Spinner';
import Card from '@components/common/complex/Card';
import ErrorComponent from '@components/common/complex/ErrorComponent';
import IndexPageContainer from '@components/common/complex/IndexPageContainer';
import CreateWordPackWindow from '@components/word-pack/CreateWordPackWindow';
import WordPackCard from '@components/word-pack/WordPackCard';

export default function WordPacksPageContent() {
  const { colorMode } = useColorMode();
  const [allWordPacksDTO, setAllWordPacksDTO] = useState<WordPackDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { isOpen: isOpenCreateButton, onOpen: onOpenCreateButton, onClose: onCloseCreateButton } = useDisclosure();
  const [reloadCards, setReloadCards] = useState<boolean>(false);

  const fetchAllWordPacksDTO = () => {
    setLoading(true);
    getAllWordPacks()
      .then((response) => {
        const { data } = response;
        const standardWordPacksDTO = data
          .filter((wordPackDTO) => wordPackDTO.category.toLowerCase() !== Category.CUSTOM.toLowerCase())
          .filter((wordPackDTO) => wordPackDTO.totalWords > 0);
        const customWordPacksDTO = data
          .filter((wordPackDTO) => wordPackDTO.category.toLowerCase() === Category.CUSTOM.toLowerCase());
        setAllWordPacksDTO(standardWordPacksDTO.concat(customWordPacksDTO));
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
  useEffect(() => {
    if (reloadCards) {
      fetchAllWordPacksDTO();
      setReloadCards(false);
    }
  }, [reloadCards]);

  const wordPackCategories = Array.from(new Set(allWordPacksDTO?.map((wordPackDTO) => wordPackDTO.category)));
  const wordPacksDTOByCategory = (category: Category) => allWordPacksDTO
    .filter((wordPackDTO) => wordPackDTO.category.toLowerCase() === category.toLowerCase());
  const wordPackCategoriesStandard = wordPackCategories
    .filter((wordPackCategory) => wordPackCategory.toLowerCase() !== Category.CUSTOM.toLowerCase());

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
      <>
        {wordPackCategoriesStandard.map((wordPackCategory) => (
          <Section key={wordPackCategory}>
            <Heading size={Size.LG} isCentered>{Category[wordPackCategory as keyof typeof Category]}</Heading>
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
        <Section>
          <Heading size={Size.LG} isCentered>Custom Word Packs</Heading>
          <WordPacksContainer>
            {wordPacksDTOByCategory(Category.CUSTOM).map((wordPackDTO) => (
              <WordPackCard
                key={wordPackDTO.name}
                wordPackDTO={wordPackDTO}
                fetchAllWordPacksDTO={fetchAllWordPacksDTO}
              />
            ))}
            <AddCustomWordPackContainer onClick={onOpenCreateButton}>
              <Card
                face={null}
                back={null}
                height="280px"
                width="215px"
                padding="0 25px"
                bgColor={theme.colors[colorMode].borderColor}
                isFlipped={false}
                setFlipped={() => null}
              />
              {isOpenCreateButton && (
                <CreateWordPackWindow
                  isOpen={isOpenCreateButton}
                  onClose={onCloseCreateButton}
                  setReload={setReloadCards}
                />
              )}
            </AddCustomWordPackContainer>
          </WordPacksContainer>
        </Section>
      </>
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

const AddCustomWordPackContainer = styled.div`
`;

const WordPacksContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 40px;
`;
