import React, { useEffect, useState } from 'react';
import { TbCards } from 'react-icons/tb';
import styled from 'styled-components';
import { useColorMode, useDisclosure } from '@chakra-ui/react';
import { getWordPack } from '@services/word-packs';
import { ButtonType, FontWeight, Size } from '@utils/constants';
import { theme } from '@utils/theme';
import { WordPackDTO } from '@utils/types';
import Button from '@components/common/basic/Button';
import Text from '@components/common/basic/Text';
import ButtonsContainer from '@components/common/complex/ButtonsContainer';
import ButtonUnavailable from '@components/common/complex/ButtonUnavailable';
import Card from '@components/common/complex/Card';
import CreateOrUpdateReviewWindow from '@components/review/CreateOrUpdateReviewWindow';
import ReviewWordPackWindow from '@components/word-pack/ReviewWordPackWindow';

type Props = {
  wordPackDTO: WordPackDTO;
};

export default function WordPackCard(props: Props) {
  const { wordPackDTO } = props;

  const { colorMode } = useColorMode();
  const { isOpen: isOpenPreviewButton, onOpen: onOpenPreviewButton, onClose: onClosePreviewButton } = useDisclosure();
  const { isOpen: isOpenCreateButton, onOpen: onOpenCreateButton, onClose: onCloseCreateButton } = useDisclosure();
  const [updatedWordPackDTO, setUpdatedWordPackDTO] = useState(wordPackDTO);
  const [reload, setReload] = useState(false);
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const [isFlipped, setFlipped] = useState(false);

  const fetchWordPackDTO = (wordPackName: string) => {
    setButtonDisabled(true);
    getWordPack(wordPackName)
      .then((response) => setUpdatedWordPackDTO(response.data))
      .catch((error) => console.error(error.code, error.response.data.message))
      .finally(() => setButtonDisabled(false));
  };

  useEffect(() => {
    if (reload) {
      fetchWordPackDTO(wordPackDTO.name);
      setReload(false);
    }
  }, [reload]);

  const onClickCreateButton = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onOpenCreateButton();
  };
  const onClickPreviewButton = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onOpenPreviewButton();
  };

  return (
    <Card
      height='280px'
      width='215px'
      padding='0 25px'
      bgColor={theme.colors[colorMode].bgColor}
      isFlipped={isFlipped}
      setFlipped={setFlipped}
      face={(
        <ContentsContainer>
          <WordPackNameContainer>
            <Text size={Size.XXL} fontWeight={FontWeight.MEDIUM} isCentered>{wordPackDTO.name}</Text>
          </WordPackNameContainer>
          <WordsCountContainer>
            <TbCards />
            <Text size={Size.MD}>{wordPackDTO.totalWords}</Text>
          </WordsCountContainer>
          <ButtonsContainer>
            {updatedWordPackDTO.reviewId !== undefined
              ? (
                <ButtonUnavailable
                  text='Added'
                  isWithIcon
                />
              )
              : (
                <>
                  <Button
                    buttonText="Create Daily Review"
                    buttonType={ButtonType.BUTTON}
                    size={Size.SM}
                    onClick={onClickCreateButton}
                  />
                  {isOpenCreateButton && (
                    <CreateOrUpdateReviewWindow
                      isOpen={isOpenCreateButton}
                      onClose={onCloseCreateButton}
                      wordPackDTO={wordPackDTO}
                      setReload={setReload}
                      isButtonDisabled={isButtonDisabled}
                    />
                  )}
                </>
              )}
          </ButtonsContainer>
        </ContentsContainer>
      )}
      back={(
        <ContentsContainer>
          <DescriptionContainer>
            <Text size={{ base: Size.SM, md: Size.MD, xl: Size.MD }} isCentered>{wordPackDTO.description}</Text>
          </DescriptionContainer>
          <ButtonsContainer>
            <Button
              buttonText="Preview Words"
              buttonType={ButtonType.BUTTON}
              size={Size.SM}
              onClick={onClickPreviewButton}
            />
            {isOpenPreviewButton && (
              <ReviewWordPackWindow
                isOpen={isOpenPreviewButton}
                onClose={onClosePreviewButton}
                wordPackDTO={updatedWordPackDTO}
              />
            )}
          </ButtonsContainer>
        </ContentsContainer>
      )}
    />
  );
}

const ContentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 85%;
`;

const WordPackNameContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const WordsCountContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const DescriptionContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;
