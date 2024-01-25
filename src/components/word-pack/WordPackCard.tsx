import { useContext, useEffect, useState } from 'react';
import { TbCards } from 'react-icons/tb';
import styled from 'styled-components';
import { ColorMode, useColorMode, useDisclosure } from '@chakra-ui/react';
import { AuthContext } from '@context/AuthContext';
import { getWordPack } from '@services/word-packs';
import { ButtonType, FontWeight, RoleName, Size } from '@utils/constants';
import { borderStyles } from '@utils/functions';
import { theme } from '@utils/theme';
import { WordPackDTO } from '@utils/types';
import Button from '@components/common/basic/Button';
import InfoButton from '@components/common/basic/InfoButton';
import Text from '@components/common/basic/Text';
import ButtonsContainer from '@components/common/complex/ButtonsContainer';
import SignAdded from '@components/common/complex/SignAdded';
import CreateReviewWindow from '@components/review/CreateReviewWindow';
import ReviewWordPackWindow from '@components/word-pack/ReviewWordPackWindow';

type Props = {
  wordPackDTO: WordPackDTO;
};

export default function WordPackCard(props: Props) {
  const { wordPackDTO } = props;

  const { user } = useContext(AuthContext);
  const { colorMode } = useColorMode();
  const { isOpen: isOpenPreviewButton, onOpen: onOpenPreviewButton, onClose: onClosePreviewButton } = useDisclosure();
  const { isOpen: isOpenCreateButton, onOpen: onOpenCreateButton, onClose: onCloseCreateButton } = useDisclosure();
  const [updatedWordPackDTO, setUpdatedWordPackDTO] = useState(wordPackDTO);
  const [reload, setReload] = useState(false);
  const [isButtonDisabled, setButtonDisabled] = useState(false);

  const fetchWordPackDTO = (wordPackName: string) => {
    setButtonDisabled(true);
    getWordPack(wordPackName)
      .then((response) => setUpdatedWordPackDTO(response.data.data.wordPackDTO))
      .catch((error) => console.error(error.code, error.response.data.message))
      .finally(() => setButtonDisabled(false));
  };

  useEffect(() => {
    if (reload) {
      fetchWordPackDTO(wordPackDTO.name);
      setReload(false);
    }
  }, [reload]);

  return (
    <Container $colorMode={colorMode}>
      <InfoButtonContainer>
        <InfoButton onClick={onOpenPreviewButton} />
        {isOpenPreviewButton && (
          <ReviewWordPackWindow
            isOpen={isOpenPreviewButton}
            onClose={onClosePreviewButton}
            wordPackDTO={updatedWordPackDTO}
          />
        )}
      </InfoButtonContainer>
      <WordPackNameContainer>
        <Text size={Size.XXL} fontWeight={FontWeight.SEMIBOLD} isCentered>{wordPackDTO.name}</Text>
      </WordPackNameContainer>
      <WordsCountContainer>
        <TbCards />
        <Text size={Size.MD}>{wordPackDTO.totalWords}</Text>
      </WordsCountContainer>
      <DescriptionContainer $height={user?.role === RoleName.USER_CHINESE ? '120px' : '85px'}>
        <Text size={{ base: Size.SM, md: Size.MD, xl: Size.MD }} isCentered>{wordPackDTO.description}</Text>
      </DescriptionContainer>
      <ButtonsContainer>
        {updatedWordPackDTO.reviewId !== undefined
          ? <SignAdded />
          : (
            <>
              <Button
                buttonText="Create Daily Review"
                buttonType={ButtonType.BUTTON}
                size={Size.SM}
                onClick={onOpenCreateButton}
              />
              <CreateReviewWindow
                isOpen={isOpenCreateButton}
                onClose={onCloseCreateButton}
                wordPackDTO={wordPackDTO}
                setReload={setReload}
                isButtonDisabled={isButtonDisabled}
              />
            </>
          )}
      </ButtonsContainer>
    </Container>
  );
}

const Container = styled.div<{ $colorMode: ColorMode }>`
  height: 280px;
  width: calc(280px / 1.3);
  padding: 0 25px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: ${({ $colorMode }) => borderStyles($colorMode)};
  border-radius: ${theme.stylesToDelete.borderRadius};
  background-color: ${({ $colorMode }) => theme.colors[$colorMode].bgColor};
`;

const InfoButtonContainer = styled.div`
  display: flex;
  justify-content: right;
  margin-top: -15px;
  margin-bottom: 15px;
  margin-right: -15px;
`;

const WordPackNameContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const WordsCountContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DescriptionContainer = styled.div<{ $height: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${({ $height }) => $height};
`;
