import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useColorMode, useDisclosure } from '@chakra-ui/react';
import { successNotification } from '@services/popup-notification';
import { deleteReview, getReview, refreshReview } from '@services/reviews';
import { ButtonType, FontWeight, Size } from '@utils/constants';
import { theme } from '@utils/theme';
import { ReviewDTO, Status } from '@utils/types';
import Button from '@components/common/basic/Button';
import Text from '@components/common/basic/Text';
import AlertDialog from '@components/common/complex/AlertDialog';
import ButtonsContainer from '@components/common/complex/ButtonsContainer';
import ButtonUnavailable from '@components/common/complex/ButtonUnavailable';
import Card from '@components/common/complex/Card';
import CreateOrUpdateReviewWindow from '@components/review/CreateOrUpdateReviewWindow';
import StartReviewWindow from '@components/review/StartReviewWindow';

type Props = {
  reviewDTO: ReviewDTO;
  fetchAllReviewsDTO: () => void;
};

export default function ReviewCard(props: Props) {
  const { reviewDTO, fetchAllReviewsDTO } = props;

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
  const isNoWordsLeftInReview = () => updatedReviewDTO.listOfWordDTO?.length === 0;

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

  const onClickStartButton = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onOpenStartButton();
  };
  const onClickRefreshButton = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    requestRefreshReview(reviewDTO.id!);
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
            <Text size={Size.XXL} fontWeight={FontWeight.SEMIBOLD} isCentered>{reviewDTO.wordPackDTO.name}</Text>
          </WordPackNameContainer>
          <WordsCountContainer>
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
            {
              !isDateLastCompletedToday() && !isNoWordsLeftInReview()
                ? (
                  <>
                    <Button
                      buttonText='Start'
                      buttonType={ButtonType.BUTTON}
                      size={Size.SM}
                      onClick={onClickStartButton}
                      isDisabled={isButtonDisabled}
                    />
                    {isOpenStartButton && (
                      <StartReviewWindow
                        reviewId={reviewDTO.id!}
                        isOpen={isOpenStartButton}
                        onClose={onCloseStartButton}
                        totalReviewWords={updatedReviewDTO.actualSize}
                        setReload={setReloadCard}
                      />
                    )}
                  </>
                )
                : <ButtonUnavailable text='Completed' isWithIcon />
            }
          </ButtonsContainer>
        </ContentsContainer>
      )}
      back={(
        <ContentsContainer>
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
                header="Remove this daily review?"
                body="Your known words and review progress will be saved if you choose to add this review again later."
                deleteButtonText="Remove"
                isButtonDisabled={isButtonDisabled}
                width='600px'
              />
            )}
          </ButtonsContainer>
          <DescriptionContainer>
            <Text isCentered>{reviewDTO.wordPackDTO.description}</Text>
          </DescriptionContainer>
          <ButtonsContainer>
            {
              isNoWordsLeftInReview()
                ? (
                  <Button
                    buttonText='Refresh'
                    buttonType={ButtonType.BUTTON}
                    size={Size.SM}
                    onClick={onClickRefreshButton}
                    isDisabled={isButtonDisabled}
                  />
                )
                : (
                  <ButtonUnavailable text='Refreshed' />
                )
            }
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
