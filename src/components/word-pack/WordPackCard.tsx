import React, { useContext, useEffect, useState } from 'react';
import { TbCards } from 'react-icons/tb';
import styled from 'styled-components';
import { useColorMode, useDisclosure } from '@chakra-ui/react';
import { AuthContext } from '@context/AuthContext';
import { errorNotification, successNotification } from '@services/popup-notification';
import { deleteCustomWordPack, getWordPack } from '@services/word-packs';
import { ButtonType, ButtonWithIconType, FontWeight, Size } from '@utils/constants';
import { getOriginalWordPackName } from '@utils/functions';
import { theme } from '@utils/theme';
import { Category, WordPackDTO } from '@utils/types';
import Button from '@components/common/basic/Button';
import ButtonWithIcon from '@components/common/basic/ButtonWithIcon';
import Text from '@components/common/basic/Text';
import AlertDialog from '@components/common/complex/AlertDialog';
import ButtonsContainer from '@components/common/complex/ButtonsContainer';
import ButtonUnavailable from '@components/common/complex/ButtonUnavailable';
import Card from '@components/common/complex/Card';
import CreateOrUpdateReviewWindow from '@components/review/CreateOrUpdateReviewWindow';
import ReviewWordPackWindow from '@components/word-pack/ReviewWordPackWindow';
import SearchWindow from '@components/word-pack/SearchWindow';

type Props = {
  wordPackDTO: WordPackDTO;
  fetchAllWordPacksDTO: () => void;
};

export default function WordPackCard(props: Props) {
  const { wordPackDTO, fetchAllWordPacksDTO } = props;

  const { user } = useContext(AuthContext);
  const { colorMode } = useColorMode();
  const { isOpen: isOpenPreviewButton, onOpen: onOpenPreviewButton, onClose: onClosePreviewButton } = useDisclosure();
  const { isOpen: isOpenCreateButton, onOpen: onOpenCreateButton, onClose: onCloseCreateButton } = useDisclosure();
  const { isOpen: isOpenDeleteButton, onOpen: onOpenDeleteButton, onClose: onCloseDeleteButton } = useDisclosure();
  const { isOpen: isOpenSearch, onOpen: onOpenSearch, onClose: onCloseSearch } = useDisclosure();
  const [updatedWordPackDTO, setUpdatedWordPackDTO] = useState(wordPackDTO);
  const [reloadCard, setReloadCard] = useState(false);
  const [reloadCards, setReloadCards] = useState<boolean>(false);
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const [isFlipped, setFlipped] = useState(false);

  const fetchWordPackDTO = () => {
    setButtonDisabled(true);
    getWordPack(wordPackDTO.name)
      .then((response) => setUpdatedWordPackDTO(response.data))
      .catch((error) => console.error(error.code, error.response.data.message))
      .finally(() => setButtonDisabled(false));
  };

  const handleDeleteCustomWordPack = () => {
    setButtonDisabled(true);
    deleteCustomWordPack(wordPackDTO.name)
      .then(() => {
        successNotification('Word Pack deleted successfully', `${getOriginalWordPackName(wordPackDTO.name, user)} deleted successfully`);
        setReloadCards(!reloadCards);
      })
      .catch((e) => errorNotification(e.code, e.response.data.message))
      .finally(() => {
        onCloseDeleteButton();
        setButtonDisabled(false);
      });
  };

  useEffect(() => {
    if (reloadCard) {
      fetchWordPackDTO();
      setReloadCard(false);
    }
  }, [reloadCard]);

  useEffect(() => {
    if (reloadCards) {
      fetchAllWordPacksDTO();
      setReloadCards(false);
    }
  }, [reloadCards]);

  const onClickCreateButton = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onOpenCreateButton();
  };
  const onClickPreviewButton = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onOpenPreviewButton();
  };
  const onClickAddWordButton = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onOpenSearch();
  };
  const onClickDeleteButton = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onOpenDeleteButton();
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
            <Text size={Size.XXL} fontWeight={FontWeight.MEDIUM} isCentered>{getOriginalWordPackName(wordPackDTO.name, user)}</Text>
          </WordPackNameContainer>
          <WordsCountContainer>
            <TbCards />
            <Text size={Size.MD}>{updatedWordPackDTO.totalWords}</Text>
          </WordsCountContainer>
          <ButtonsContainer>
            {updatedWordPackDTO.reviewId !== undefined
              ? <ButtonUnavailable text='Added' isWithIcon />
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
                      setReload={setReloadCards}
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
            <ButtonWithIcon
              type={ButtonWithIconType.PREVIEW}
              onClick={onClickPreviewButton}
              isOpen={isOpenPreviewButton}
              modalContent={(
                <ReviewWordPackWindow
                  isOpen={isOpenPreviewButton}
                  onClose={onClosePreviewButton}
                  wordPackDTO={updatedWordPackDTO}
                />
              )}
            />
            {wordPackDTO.category.toLowerCase() === Category.CUSTOM.toLowerCase() && (
              <>
                <ButtonWithIcon
                  type={ButtonWithIconType.CHANGE}
                  onClick={onClickAddWordButton}
                  isOpen={isOpenSearch}
                  modalContent={(
                    <SearchWindow
                      isOpen={isOpenSearch}
                      onClose={onCloseSearch}
                      wordPackDTO={wordPackDTO}
                      setReloadCard={setReloadCard}
                    />
                  )}
                />
                <ButtonWithIcon
                  type={ButtonWithIconType.DELETE}
                  onClick={onClickDeleteButton}
                  isOpen={isOpenDeleteButton}
                  modalContent={(
                    <AlertDialog
                      isOpen={isOpenDeleteButton}
                      onClose={onCloseDeleteButton}
                      handleDelete={handleDeleteCustomWordPack}
                      header="Delete this word pack?"
                      body="If you have a review for this word pack, it will also be removed."
                      deleteButtonText="Delete"
                      isButtonDisabled={isButtonDisabled}
                      width='600px'
                    />
                  )}
                />
              </>
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
