import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useBreakpointValue } from '@chakra-ui/react';
import { successNotification } from '@services/popup-notification';
import { processReviewAction } from '@services/reviews';
import { Breakpoint, ButtonType } from '@utils/constants';
import { mediaBreakpointUp } from '@utils/functions';
import { Status, WordDTO } from '@utils/types';
import Button from '@components/common/basic/Button';
import ProgressBar from '@components/common/basic/ProgressBar';
import ButtonsContainer from '@components/common/complex/ButtonsContainer';
import Modal from '@components/common/complex/Modal';
import ReviewWordCard from '@components/review/ReviewWordCard';

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
  const [isThrown, setThrown] = useState(false);
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const [isAnswerCorrect, setAnswerCorrect] = useState<boolean | null>(null);

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
        if (response?.data.data != null) {
          setReviewWordDTO(response.data.data.reviewWordDTO);
          setReviewUpdatedSize(response.data.data.reviewUpdatedSize);
        } else {
          setFormVisible(false);
          setReviewComplete(true);
        }
        setReload(true);
        setButtonDisabled(false);
        setThrown(false);
      })
      .catch((error) => console.error(error.code, error.response.data.message));
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
    setThrown(true);
    setAnswerCorrect(answer);
  };

  const reviewProgress = ((totalReviewWords - reviewUpdatedSize) / totalReviewWords) * 100;

  return (
    <Modal
      width={useBreakpointValue({ base: '80vw', lg: '1000px' })}
      isOpen={isOpen}
      onClose={onClose}
      header={null}
      body={(
        <Container>
          {(isFormVisible && !isReviewComplete && reviewWordDTO)
            ? (
              <>
                <ProgressBarContainer>
                  <ProgressBar value={reviewProgress} />
                </ProgressBarContainer>
                <CardContainer>
                  <ReviewWordCard
                    reviewWordDTO={reviewWordDTO!}
                    isFlipped={isFlipped}
                    setFlipped={setFlipped}
                    isThrown={isThrown}
                    pressButton={pressButton}
                    answer={isAnswerCorrect}
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
            )
            : <Placeholder />}
        </Container>
      )}
    />
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  overflow-x: hidden;
  overflow-y: hidden;
  
  ${mediaBreakpointUp(Breakpoint.TABLET)} {
    gap: 100px;
    margin: 0 0 50px 0;
  }
`;

const Placeholder = styled.div`
  width: 80vh;
    height: 460px;

    ${mediaBreakpointUp('400px')} {
        height: 518px;
    }

    ${mediaBreakpointUp(Breakpoint.TABLET)} {
        height: 738px;
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
