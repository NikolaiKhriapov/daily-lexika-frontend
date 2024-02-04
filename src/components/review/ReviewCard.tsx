import React, { useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { ColorMode, useColorMode, useDisclosure } from '@chakra-ui/react';
import { AuthContext } from '@context/AuthContext';
import { successNotification } from '@services/popup-notification';
import { getReview, refreshReview, deleteReview } from '@services/reviews';
import { ButtonType, FontWeight, RoleName, Size } from '@utils/constants';
import { borderStyles } from '@utils/functions';
import { theme } from '@utils/theme';
import { ReviewDTO, Status } from '@utils/types';
import Button from '@components/common/basic/Button';
import CompletedIcon from '@components/common/basic/CompletedIcon';
import Text from '@components/common/basic/Text';
import AlertDialog from '@components/common/complex/AlertDialog';
import ButtonsContainer from '@components/common/complex/ButtonsContainer';
import StartReviewWindow from '@components/review/StartReviewWindow';
import CreateOrUpdateReviewWindow from '@components/review/CreateOrUpdateReviewWindow';

type Props = {
  reviewDTO: ReviewDTO;
  fetchAllReviewsDTO: () => void;
};

export default function ReviewCard(props: Props) {
  const { reviewDTO, fetchAllReviewsDTO } = props;

  const { user } = useContext(AuthContext);
  const { colorMode } = useColorMode();
  const { isOpen: isOpenStartButton, onOpen: onOpenStartButton, onClose: onCloseStartButton } = useDisclosure();
  const { isOpen: isOpenChangeButton, onOpen: onOpenChangeButton, onClose: onCloseChangeButton } = useDisclosure();
  const { isOpen: isOpenRemoveButton, onOpen: onOpenRemoveButton, onClose: onCloseRemoveButton } = useDisclosure();
  const [updatedReviewDTO, setUpdatedReviewDTO] = useState(reviewDTO);
  const [reviewRemoved, setReviewRemoved] = useState(false);
  const [reviewRefreshed, setReviewRefreshed] = useState(false);
  const [reloadCard, setReloadCard] = useState<boolean>(false);
  const [reloadCards, setReloadCards] = useState<boolean>(false);
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const cancelRef = useRef<HTMLButtonElement>(null);
  const [isFlipped, setFlipped] = useState(false);

  const isDateLastCompletedToday = () =>
    new Date(updatedReviewDTO.dateLastCompleted!).getDate() === new Date().getUTCDate();

  const fetchReviewDTO = (reviewId: number) => {
    getReview(reviewId)
      .then((response) => setUpdatedReviewDTO(response.data))
      .catch((error) => console.error(error.code, error.response.data.message));
  };

  const requestRefreshReview = (reviewId: number) => {
    setButtonDisabled(true);
    setReviewRefreshed(true);
    refreshReview(reviewId)
      .then(() => fetchReviewDTO(reviewId))
      .catch((error) => console.error(error.code, error.response.data.message))
      .finally(() => {
        setReviewRefreshed(false);
        setButtonDisabled(false);
      });
  };

  useEffect(() => {
    if (!reviewRemoved && !reviewRefreshed && reloadCard) {
      fetchReviewDTO(reviewDTO.id!);
      setReloadCard(false);
    }
  }, [reloadCard]);

  useEffect(() => {
    if (reloadCards) {
      fetchAllReviewsDTO();
      setReloadCards(false);
    }
  }, [reloadCards]);

  const handleRemoveReview = () => {
    setButtonDisabled(true);
    setReviewRemoved(true);
    deleteReview(reviewDTO.id!)
      .then(() => {
        successNotification('Review removed successfully', `${reviewDTO.wordPackDTO.name} removed successfully`);
        fetchAllReviewsDTO();
      })
      .catch((e) => console.error(e.code, e.response.data.message))
      .finally(() => {
        onCloseRemoveButton();
        setButtonDisabled(false);
      });
  };

  const totalNewWords = updatedReviewDTO.listOfWordDTO!.filter((wordDTO) => wordDTO.status.toString() === Status[Status.NEW]).length;
  const totalInReviewWords = updatedReviewDTO.listOfWordDTO!.filter((wordDTO) => wordDTO.status.toString() === Status[Status.IN_REVIEW] || wordDTO.status.toString() === Status[Status.KNOWN]).length;

  const dynamicStyles = {
    transform: `${isFlipped ? 'rotateY(180deg) scaleX(-1)' : 'rotateY(0deg)'}`,
    transition: 'transform 0.3s',
  };

  const onClickStartOrRefreshButton = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    !isDateLastCompletedToday() ? onOpenStartButton() : requestRefreshReview(reviewDTO.id!);
  };
  const onClickChangeButton = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onOpenChangeButton();
  };
  const onClickRemoveButton = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onOpenRemoveButton();
  };

  return (
    <Container style={dynamicStyles} $colorMode={colorMode} onClick={() => setFlipped(!isFlipped)}>
      {!isFlipped && (
        <ContentsContainer>
          <CompletedIconContainer>
            {isDateLastCompletedToday() && <CompletedIcon />}
          </CompletedIconContainer>
          <WordPackNameContainer>
            <Text size={Size.XXL} fontWeight={FontWeight.SEMIBOLD} isCentered>{reviewDTO.wordPackDTO.name}</Text>
          </WordPackNameContainer>
          <WordsCountContainer $height={user?.role === RoleName.USER_CHINESE ? '140px' : '105px'}>
            <WordsContainer>
              <Text size={Size.XXL}>{totalNewWords}</Text>
              <Text size={Size.SM}>{' New Words'}</Text>
            </WordsContainer>
            <WordsContainer>
              <Text size={Size.XXL}>{totalInReviewWords}</Text>
              <Text size={Size.SM}>{' Review Words'}</Text>
            </WordsContainer>
          </WordsCountContainer>
          <ButtonsContainer>
            <Button
              buttonText={!isDateLastCompletedToday() ? 'Start' : 'Refresh'}
              buttonType={ButtonType.BUTTON}
              size={Size.SM}
              onClick={onClickStartOrRefreshButton}
              isDisabled={isButtonDisabled}
            />
            {isOpenStartButton && (
              <StartReviewWindow
                reviewId={reviewDTO.id!}
                isOpen={isOpenStartButton}
                onClose={onCloseStartButton}
                totalReviewWords={reviewDTO.listOfWordDTO!.length}
                setReload={setReloadCard}
              />
            )}
          </ButtonsContainer>
        </ContentsContainer>
      )}
      {isFlipped && (
        <ContentsContainer>
          <DescriptionContainer>
            <Text isCentered>{reviewDTO.wordPackDTO.description}</Text>
          </DescriptionContainer>
          <ButtonsContainer>
            <Button
              buttonText="Change"
              buttonType={ButtonType.BUTTON}
              size={Size.SM}
              onClick={onClickChangeButton}
            />
            {isOpenChangeButton && (
              <CreateOrUpdateReviewWindow
                isOpen={isOpenChangeButton}
                onClose={onCloseChangeButton}
                wordPackDTO={reviewDTO.wordPackDTO}
                setReload={setReloadCards}
                isButtonDisabled={false}
                reviewDTO={reviewDTO}
              />
            )}
            <Button
              buttonText="Remove"
              buttonType={ButtonType.BUTTON_RED}
              size={Size.SM}
              onClick={onClickRemoveButton}
            />
            {isOpenRemoveButton && (
              <AlertDialog
                isOpenDeleteButton={isOpenRemoveButton}
                onCloseDeleteButton={onCloseRemoveButton}
                cancelRef={cancelRef}
                handleDelete={handleRemoveReview}
                header="Remove Review"
                body={`Are you sure you want to delete daily review? You can't undo this action.`}
                deleteButtonText="Delete"
                isButtonDisabled={isButtonDisabled}
              />
            )}
          </ButtonsContainer>
        </ContentsContainer>
      )}
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
  cursor: pointer;
`;

const ContentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 85%;
`;

const CompletedIconContainer = styled.div`
  display: flex;
  height: 16px;
  margin-top: -10px;
  margin-bottom: 10px;
  margin-left: -10px;
`;

const WordPackNameContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const WordsCountContainer = styled.div<{ $height: string }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
`;

const WordsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: baseline;
  gap: 4px;
`;

const DescriptionContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;
