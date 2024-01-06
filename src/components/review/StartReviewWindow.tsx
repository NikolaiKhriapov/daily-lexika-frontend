import React, { useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import { processReviewAction } from '../../services/reviews';
import { errorNotification, successNotification } from '../../services/popup-notification';
import ReviewWordCard from './ReviewWordCard';
import { Status, WordDTO } from '../../utils/types';
import { Breakpoint, ButtonType } from '../../utils/constants';
import Modal from '../common/complex/Modal';
import ButtonsContainer from '../common/complex/ButtonsContainer';
import ProgressBar from '../common/basic/ProgressBar';
import Button from '../common/basic/Button';
import { mediaBreakpointUp } from '../../utils/functions';

type Props = {
  reviewId: number;
  isOpen: boolean;
  onClose: () => void;
  totalReviewWords: number;
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function StartReviewWindow(props: Props) {
  const { reviewId, isOpen, onClose, totalReviewWords, setReload } = props;

  const [reviewWordDTO, setReviewWordDTO] = useState<WordDTO | null>(null);
  const [reviewUpdatedSize, setReviewUpdatedSize] = useState<number>(0);
  const [isFormVisible, setFormVisible] = useState(true);
  const [isReviewComplete, setReviewComplete] = useState(false);
  const [isFlipped, setFlipped] = useState(false);
  const [isButtonDisabled, setButtonDisabled] = useState(false);

  const fetchReviewAction = (answer: boolean | null) => {
    setButtonDisabled(true);
    if ((answer === true && reviewWordDTO !== null && (reviewWordDTO.status.toString() === Status[Status.NEW]
      || (reviewWordDTO.status.toString() === Status[Status.IN_REVIEW] && reviewWordDTO.totalStreak === 4)))) {
      successNotification(
        `${reviewWordDTO.nameChineseSimplified} is a known word.`,
        'This word will still be shown occasionally during reviews',
      );
    }
    if (answer === false && reviewWordDTO !== null && (reviewWordDTO.status.toString() === Status[Status.KNOWN])) {
      successNotification(
        `Keep reviewing ${reviewWordDTO.nameChineseSimplified}`,
        'This word will be shown more frequently so that you can relearn it',
      );
    }
    processReviewAction(reviewId, answer)
      .then((response) => {
        if (response.data.data != null) {
          setReviewWordDTO(response.data.data.reviewWordDTO);
          setReviewUpdatedSize(response.data.data.reviewUpdatedSize);
        } else {
          setFormVisible(false);
          setReviewComplete(true);
        }
        setReload(true);
        setButtonDisabled(false);
      })
      .catch((error) => errorNotification(error.code, error.response.data.message));
  };

  useEffect(() => {
    fetchReviewAction(null);
  }, [reviewId]);

  useEffect(() => {
    if (!isFormVisible && isReviewComplete) {
      onClose();
    }
  }, [isFormVisible, isReviewComplete]);

  const pressButton = (answer: boolean | null) => {
    fetchReviewAction(answer);
    setFlipped(false);
  };

  const reviewProgress = ((totalReviewWords - reviewUpdatedSize) / totalReviewWords) * 100;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      header={null}
      body={(
        <Container>
          {isFormVisible && !isReviewComplete && reviewWordDTO && (
            <>
              <ProgressBarContainer>
                <ProgressBar value={reviewProgress} />
              </ProgressBarContainer>
              <CardContainer>
                <ReviewWordCard
                  reviewWordDTO={reviewWordDTO!}
                  isFlipped={isFlipped}
                  setFlipped={setFlipped}
                />
                <ButtonsContainer>
                  <Button
                    buttonText='Forgot'
                    buttonType={ButtonType.BUTTON_RED}
                    onClick={() => pressButton(false)}
                    isDisabled={isButtonDisabled}
                  />
                  <Button
                    buttonText='Remembered'
                    buttonType={ButtonType.BUTTON}
                    onClick={() => pressButton(true)}
                    isDisabled={isButtonDisabled}
                  />
                </ButtonsContainer>
              </CardContainer>
            </>
          )}
        </Container>
      )}
    />
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 80vw;
  
  ${mediaBreakpointUp(Breakpoint.TABLET)} {
    gap: 100px;
    margin: 0 0 50px 0;
  }

  ${mediaBreakpointUp(Breakpoint.DESKTOP)} {
    width: 1000px;
  }
`;

const ProgressBarContainer = styled.div`
  margin: 20px 10px;
  
  ${mediaBreakpointUp('450px')} {
    margin: 20px 50px;
  }
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
`;
