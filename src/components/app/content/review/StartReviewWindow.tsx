import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { useBreakpointValue } from '@chakra-ui/react';
import { successNotification } from '@services/app/popup-notification';
import { useProcessReviewActionMutation } from '@store/api/reviewsAPI';
import { useGetUserInfoQuery } from '@store/api/userAPI';
import { Breakpoint, ButtonType } from '@utils/constants';
import { mediaBreakpointUp } from '@utils/functions';
import { ReviewDto, Status, WordDto } from '@utils/types';
import ReviewWordCard from '@components/app/content/review/ReviewWordCard';
import Button from '@components/ui-common/basic/Button';
import ProgressBar from '@components/ui-common/basic/ProgressBar';
import ButtonsContainer from '@components/ui-common/complex/ButtonsContainer';
import Modal from '@components/ui-common/complex/Modal';
import WordDataHelper from '@helpers/WordDataHelper';

type Props = {
  review: ReviewDto;
  isOpen: boolean;
  onClose: () => void;
};

export default function StartReviewWindow(props: Props) {
  const { review, isOpen, onClose } = props;

  const { t } = useTranslation();
  const { data: user } = useGetUserInfoQuery();
  const [processReviewAction, { isLoading }] = useProcessReviewActionMutation();
  const [reviewWord, setReviewWord] = useState<WordDto | null>(null);
  const [isModalVisible, setModalVisible] = useState(true);
  const [isFlipped, setFlipped] = useState(false);
  const [isUnlocked, setUnlocked] = useState(false);
  const [isThrown, setThrown] = useState(false);
  const [isShaking, setShaking] = useState(false);

  const fetchReviewAction = (answer: boolean | null) => {
    processReviewAction({ reviewId: review.id!, answer })
      .unwrap()
      .then((response) => {
        if (response != null && response.listOfWordDto && response.listOfWordDto.length > 0) {
          setReviewWord(response.listOfWordDto[0]);
        } else {
          setModalVisible(false);
          onClose();
        }
        if ((answer === true && reviewWord !== null && (reviewWord.status.toString() === Status[Status.NEW]
          || (reviewWord.status.toString() === Status[Status.IN_REVIEW] && reviewWord.totalStreak === 4)))) {
          successNotification(
            t('StartReviewWindow.answerYes.title').replace('{0}', WordDataHelper.getWordNameByUserRole(reviewWord, user!)),
            t('StartReviewWindow.answerYes.description'),
          );
        }
        if (answer === false && reviewWord?.status.toString() === Status[Status.KNOWN]) {
          successNotification(
            t('StartReviewWindow.answerNo.title').replace('{0}', WordDataHelper.getWordNameByUserRole(reviewWord, user!)),
            t('StartReviewWindow.answerNo.description'),
          );
        }
      })
      .finally(() => {
        setThrown(false);
        setUnlocked(false);
      });
  };

  const pressButton = (answer: boolean | null) => {
    if (isUnlocked) {
      fetchReviewAction(answer);
      setFlipped(false);
      setThrown(true);
    } else {
      setShaking(true);
    }
  };

  useEffect(() => {
    fetchReviewAction(null);
  }, []);

  useEffect(() => {
    if (!isModalVisible) {
      onClose();
    }
  }, [isModalVisible]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp': {
          setFlipped(!isFlipped);
          setUnlocked(true);
          break;
        }
        case 'ArrowDown': {
          setFlipped(!isFlipped);
          setUnlocked(true);
          break;
        }
        case 'ArrowLeft': {
          pressButton(false);
          break;
        }
        case 'ArrowRight': {
          pressButton(true);
          break;
        }
        default: break;
      }
    };

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [pressButton]);

  const reviewProgress = ((review.actualSize - review.listOfWordDto!.length) / review.actualSize) * 100;
  const modalWidth = useBreakpointValue({ base: '90%', xl: '1000px' });
  const buttonWidth = useBreakpointValue({ base: '109px', sm: '139px' });

  return (
    <Modal
      width={modalWidth}
      isOpen={isOpen}
      onClose={onClose}
      header={(
        <ProgressBarContainer>
          <ProgressBar value={reviewProgress} />
        </ProgressBarContainer>
      )}
      body={(
        <Container>
          <CardContainer>
            <ReviewWordCard
              reviewWord={reviewWord}
              isFlipped={isFlipped}
              setFlipped={setFlipped}
              setUnlocked={setUnlocked}
              isThrown={isThrown}
              isShaking={isShaking}
              setShaking={setShaking}
              pressButton={pressButton}
              isLoading={!isModalVisible || !reviewWord || isLoading}
            />
            <ButtonsContainer>
              <Button
                buttonText={reviewWord?.status.toString() === Status.NEW.toString() ? t('StartReviewWindow.buttonText.dontKnow') : t('StartReviewWindow.buttonText.forgot')}
                buttonType={ButtonType.BUTTON_RED}
                onClick={() => pressButton(false)}
                isDisabled={!isModalVisible || !reviewWord || isLoading}
                width={buttonWidth}
              />
              <Button
                buttonText={reviewWord?.status.toString() === Status.NEW.toString() ? t('StartReviewWindow.buttonText.know') : t('StartReviewWindow.buttonText.remembered')}
                buttonType={ButtonType.BUTTON}
                onClick={() => pressButton(true)}
                isDisabled={!isModalVisible || !reviewWord || isLoading}
                width={buttonWidth}
              />
            </ButtonsContainer>
          </CardContainer>
        </Container>
      )}
    />
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
    
  ${mediaBreakpointUp(Breakpoint.TABLET)} {
    gap: 70px;
    margin: 0 0 50px 0;
  }
`;

const ProgressBarContainer = styled.div`
  width: 50%;
  margin: 10px;

  ${mediaBreakpointUp('450px')} {
    width: 200px;
    margin: 10px;
  }
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
    
  ${mediaBreakpointUp(Breakpoint.TABLET)} {
    margin-top: 50px;
  }
`;
