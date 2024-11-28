import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { useColorMode, useDisclosure } from '@chakra-ui/react';
import CreateOrUpdateReviewWindow from '@daily-lexika/components/app/content/review/CreateOrUpdateReviewWindow';
import StartReviewWindow from '@daily-lexika/components/app/content/review/StartReviewWindow';
import { Countdown } from '@daily-lexika/components/ui/Countdown';
import I18nHelper from '@daily-lexika/helpers/I18nHelper';
import WordPackHelper from '@daily-lexika/helpers/WordPackHelper';
import { useDeleteReviewMutation, useRefreshReviewMutation } from '@daily-lexika/store/api/reviewsAPI';
import { useGetUserQuery } from '@daily-lexika/store/api/userAPI';
import { placeholderReview } from '@daily-lexika/utils/placeholderEntities';
import { ReviewDto, Status } from '@library/daily-lexika';
import { errorNotification, successNotification } from '@library/shared/services';
import {
  AlertDialog, Button, ButtonsContainer, ButtonType, ButtonUnavailable, ButtonWithIcon, ButtonWithIconType, Card,
  Skeleton, Text
} from '@library/shared/ui';
import { FontWeight, Size, theme } from '@library/shared/utils';

type Props = {
  review: ReviewDto;
};

export default function ReviewCard(props: Props) {
  const { review } = props;

  const { colorMode } = useColorMode();
  const { t } = useTranslation();
  const { data: user } = useGetUserQuery();
  const { isOpen: isOpenStartButton, onOpen: onOpenStartButton, onClose: onCloseStartButton } = useDisclosure();
  const { isOpen: isOpenChangeButton, onOpen: onOpenChangeButton, onClose: onCloseChangeButton } = useDisclosure();
  const { isOpen: isOpenRemoveButton, onOpen: onOpenRemoveButton, onClose: onCloseRemoveButton } = useDisclosure();
  const [refreshReview, { isLoading: isLoadingRefreshReview }] = useRefreshReviewMutation();
  const [deleteReview] = useDeleteReviewMutation();
  const [isFlipped, setFlipped] = useState(false);
  const [isDisabledChangeButton, setDisabledChangeButton] = useState(false);

  if (!user || review.id === placeholderReview.id) return <Skeleton height={280} width={215} />;

  const isNoWordsLeftInReview = review.listOfWordDto?.length === 0;

  const requestRefreshReview = () => {
    refreshReview(review.id!)
      .unwrap()
      .then(() => {
        successNotification(t('ReviewCard.reviewRefreshed'));
        setFlipped(false);
      })
      .catch((error) => errorNotification('', error));
  };

  const handleRemoveReview = () => {
    onCloseRemoveButton();
    deleteReview(review.id!)
      .unwrap()
      .then(() => successNotification(t('ReviewCard.reviewRemoved')))
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
              {I18nHelper.getWordPackNameTranslated(review.wordPackDto.name, user, t)}
            </Text>
          </WordPackNameContainer>
          <WordsCountContainer>
            <WordsContainer>
              <Text size={Size.XXL}>{totalNewWords}</Text>
              <Text size={Size.SM}>{t('ReviewCard.newWords')}</Text>
            </WordsContainer>
            <WordsContainer>
              <Text size={Size.XXL}>{totalInReviewWords}</Text>
              <Text size={Size.SM}>{t('ReviewCard.reviewWords')}</Text>
            </WordsContainer>
          </WordsCountContainer>
          <ButtonsContainer>
            {
              !isNoWordsLeftInReview
                ? (
                  <Button
                    buttonText={t('buttonText.start')}
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
                : <ButtonUnavailable text={t('buttonText.completed')} isWithIcon />
            }
          </ButtonsContainer>
        </ContentsContainer>
      )}
      back={(
        <ContentsContainer>
          <Countdown />
          <DescriptionContainer>
            <Text size={Size.SM} isCentered>{WordPackHelper.getDescriptionForLanguage(review.wordPackDto, user)}</Text>
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
                  width="600px"
                  isOpen={isOpenRemoveButton}
                  onClose={onCloseRemoveButton}
                  handleDelete={handleRemoveReview}
                  header={t('ReviewCard.AlertDialog.header')}
                  body={t('ReviewCard.AlertDialog.body')}
                  cancelButtonText={t('buttonText.cancel')}
                  deleteButtonText={t('buttonText.remove')}
                  isButtonDisabled={false}
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
