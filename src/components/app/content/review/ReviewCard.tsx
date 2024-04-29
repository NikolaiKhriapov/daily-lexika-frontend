import React, { useState } from 'react';
import styled from 'styled-components';
import { useColorMode, useDisclosure } from '@chakra-ui/react';
import { errorNotification, successNotification } from '@services/app/popup-notification';
import { useDeleteReviewMutation, useRefreshReviewMutation } from '@store/api/reviewsAPI';
import { useGetUserInfoQuery } from '@store/api/userAPI';
import { ButtonType, FontWeight, Size } from '@utils/constants';
import { theme } from '@utils/theme';
import { placeholderReview, ReviewDto, Status } from '@utils/types';
import CreateOrUpdateReviewWindow from '@components/app/content/review/CreateOrUpdateReviewWindow';
import StartReviewWindow from '@components/app/content/review/StartReviewWindow';
import Button from '@components/ui-common/basic/Button';
import ButtonWithIcon, { ButtonWithIconType } from '@components/ui-common/basic/ButtonWithIcon';
import Skeleton, { SkeletonType } from '@components/ui-common/basic/Skeleton';
import Text from '@components/ui-common/basic/Text';
import AlertDialog from '@components/ui-common/complex/AlertDialog';
import ButtonsContainer from '@components/ui-common/complex/ButtonsContainer';
import ButtonUnavailable from '@components/ui-common/complex/ButtonUnavailable';
import Card from '@components/ui-common/complex/Card';
import WordDataHelper from '@helpers/WordDataHelper';

type Props = {
  review: ReviewDto;
};

export default function ReviewCard(props: Props) {
  const { review } = props;

  const { colorMode } = useColorMode();
  const { isOpen: isOpenStartButton, onOpen: onOpenStartButton, onClose: onCloseStartButton } = useDisclosure();
  const { isOpen: isOpenChangeButton, onOpen: onOpenChangeButton, onClose: onCloseChangeButton } = useDisclosure();
  const { isOpen: isOpenRemoveButton, onOpen: onOpenRemoveButton, onClose: onCloseRemoveButton } = useDisclosure();
  const [isFlipped, setFlipped] = useState(false);
  const [isDisabledChangeButton, setDisabledChangeButton] = useState(false);

  const { data: user } = useGetUserInfoQuery();
  const [refreshReview, { isLoading: isLoadingRefreshReview }] = useRefreshReviewMutation();
  const [deleteReview] = useDeleteReviewMutation();

  if (!user || review.id === placeholderReview.id) {
    return <Skeleton type={SkeletonType.REVIEW_CARD} />;
  }

  const isNoWordsLeftInReview = review.listOfWordDto?.length === 0;

  const requestRefreshReview = () => {
    refreshReview(review.id!)
      .unwrap()
      .then(() => {
        successNotification('Review refreshed successfully', `${WordDataHelper.getOriginalWordPackName(review.wordPackDto.name, user)} refreshed successfully`);
        setFlipped(false);
      })
      .catch((error) => errorNotification('', error));
  };

  const handleRemoveReview = () => {
    onCloseRemoveButton();
    deleteReview(review.id!)
      .unwrap()
      .then(() => successNotification('Review removed successfully', `${WordDataHelper.getOriginalWordPackName(review.wordPackDto.name, user)} removed successfully`))
      .catch((error) => errorNotification('', error));
  };

  const totalNewWords = review.listOfWordDto?.filter((wordDTO) => wordDTO.status.toString() === Status[Status.NEW]).length || 0;
  const totalInReviewWords = review.listOfWordDto?.filter((wordDTO) => wordDTO.status.toString() === Status[Status.IN_REVIEW] || wordDTO.status.toString() === Status[Status.KNOWN]).length || 0;

  const onClickStartButton = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onOpenStartButton();
  };
  const onClickRefreshButton = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    requestRefreshReview();
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
      height="280px"
      width="215px"
      padding="0 25px"
      bgColor={theme.colors[colorMode].bgColor}
      isFlipped={isFlipped}
      setFlipped={setFlipped}
      face={(
        <ContentsContainer>
          <WordPackNameContainer>
            <Text size={Size.XXL} fontWeight={FontWeight.MEDIUM} isCentered>
              {WordDataHelper.getOriginalWordPackName(review.wordPackDto.name, user)}
            </Text>
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
              !isNoWordsLeftInReview
                ? (
                  <Button
                    buttonText="Start"
                    buttonType={ButtonType.BUTTON}
                    size={Size.SM}
                    onClick={onClickStartButton}
                    isDisabled={isLoadingRefreshReview}
                    isOpen={isOpenStartButton}
                    modalContent={(
                      <StartReviewWindow
                        review={review}
                        isOpen={isOpenStartButton}
                        onClose={onCloseStartButton}
                      />
                    )}
                  />
                )
                : <ButtonUnavailable text="Completed" isWithIcon />
            }
          </ButtonsContainer>
        </ContentsContainer>
      )}
      back={(
        <ContentsContainer>
          <DescriptionContainer>
            <Text isCentered>{review.wordPackDto.description}</Text>
          </DescriptionContainer>
          <ButtonsContainer>
            <ButtonWithIcon
              type={ButtonWithIconType.REFRESH}
              onClick={onClickRefreshButton}
              isDisabled={!isNoWordsLeftInReview || isLoadingRefreshReview}
            />
            <ButtonWithIcon
              type={ButtonWithIconType.CHANGE}
              onClick={onClickChangeButton}
              isDisabled={isDisabledChangeButton}
              isOpen={isOpenChangeButton}
              modalContent={(
                <CreateOrUpdateReviewWindow
                  isOpen={isOpenChangeButton}
                  onClose={onCloseChangeButton}
                  wordPack={review.wordPackDto}
                  review={review}
                  setDisabledButton={setDisabledChangeButton}
                />
              )}
            />
            <ButtonWithIcon
              type={ButtonWithIconType.DELETE}
              onClick={onClickRemoveButton}
              isDisabled={false}
              isOpen={isOpenRemoveButton}
              modalContent={(
                <AlertDialog
                  isOpen={isOpenRemoveButton}
                  onClose={onCloseRemoveButton}
                  handleDelete={handleRemoveReview}
                  header="Remove this daily review?"
                  body="Your known words and review progress will be saved if you choose to add this review again later."
                  deleteButtonText="Remove"
                  isButtonDisabled={false}
                  width="600px"
                />
              )}
            />
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
