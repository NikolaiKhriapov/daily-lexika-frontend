import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useBreakpointValue } from '@chakra-ui/react';
import { errorNotification, successNotification } from '@services/popup-notification';
import { useProcessReviewActionMutation } from '@store/api/reviewsAPI';
import { useGetUserInfoQuery } from '@store/api/userAPI';
import { Breakpoint, ButtonType, RoleName } from '@utils/constants';
import { mediaBreakpointUp } from '@utils/functions';
import { ReviewDTO, Status, WordDTO } from '@utils/types';
import Button from '@components/common/basic/Button';
import ProgressBar from '@components/common/basic/ProgressBar';
import Spinner from '@components/common/basic/Spinner';
import ButtonsContainer from '@components/common/complex/ButtonsContainer';
import Modal from '@components/common/complex/Modal';
import ReviewWordCard from '@components/review/ReviewWordCard';

type Props = {
  review: ReviewDTO;
  isOpen: boolean;
  onClose: () => void;
};

export default function StartReviewWindow(props: Props) {
  const { review, isOpen, onClose } = props;

  const [reviewWordDTO, setReviewWordDTO] = useState<WordDTO | null>(null);
  const [isFormVisible, setFormVisible] = useState(true);
  const [isReviewComplete, setReviewComplete] = useState(false);
  const [isFlipped, setFlipped] = useState(false);
  const [isThrown, setThrown] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const { data: user } = useGetUserInfoQuery();
  const [processReviewAction] = useProcessReviewActionMutation();

  const fetchReviewAction = (answer: boolean | null) => {
    setLoading(true);
    processReviewAction({ reviewId: review.id!, answer })
      .unwrap()
      .then((response) => {
        if (response != null && response.listOfWordDTO && response.listOfWordDTO.length > 0) {
          setReviewWordDTO(response.listOfWordDTO[0]);
        } else {
          setFormVisible(false);
          setReviewComplete(true);
        }
      })
      .catch((error) => errorNotification('', error.data.message))
      .finally(() => {
        setLoading(false);
        setThrown(false);
        if ((answer === true && reviewWordDTO !== null && (reviewWordDTO.status.toString() === Status[Status.NEW]
          || (reviewWordDTO.status.toString() === Status[Status.IN_REVIEW] && reviewWordDTO.totalStreak === 4)))) {
          successNotification(`'${getReviewWordName(reviewWordDTO)}' is a known word.`, 'This word will still be shown occasionally during reviews');
        }
        if (answer === false && reviewWordDTO?.status.toString() === Status[Status.KNOWN]) {
          successNotification(`Keep reviewing '${getReviewWordName(reviewWordDTO)}'`, 'This word will be shown more frequently so that you can relearn it');
        }
      });
  };

  useEffect(() => {
    fetchReviewAction(null);
  }, []);

  useEffect(() => {
    if (!isFormVisible && isReviewComplete) {
      onClose();
    }
  }, [isFormVisible, isReviewComplete]);

  const pressButton = (answer: boolean | null) => {
    fetchReviewAction(answer);
    setFlipped(false);
    setThrown(true);
  };

  const reviewProgress = ((review.actualSize - review.listOfWordDTO!.length) / review.actualSize) * 100;
  const modalWidth = useBreakpointValue({ base: '80vw', xl: '1000px' });

  if (!user) return <Spinner />;

  const getReviewWordName = (reviewWord: WordDTO): string => {
    const map: Record<RoleName, string> = {
      [RoleName.USER_ENGLISH]: reviewWord.wordDataDTO.nameEnglish,
      [RoleName.USER_CHINESE]: reviewWord.wordDataDTO.nameChineseSimplified,
      [RoleName.ADMIN]: '',
    };
    return map[user.role!];
  };

  return (
    <Modal
      width={modalWidth}
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
                    reviewWord={reviewWordDTO!}
                    isFlipped={isFlipped}
                    setFlipped={setFlipped}
                    isThrown={isThrown}
                    pressButton={pressButton}
                    isLoading={isLoading}
                  />
                  <ButtonsContainer>
                    <Button
                      buttonText="Forgot"
                      buttonType={ButtonType.BUTTON_RED}
                      onClick={() => pressButton(false)}
                      isDisabled={isLoading}
                    />
                    <Button
                      buttonText="Remembered"
                      buttonType={ButtonType.BUTTON}
                      onClick={() => pressButton(true)}
                      isDisabled={isLoading}
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
    gap: 70px;
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
