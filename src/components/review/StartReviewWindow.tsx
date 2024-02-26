import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useBreakpointValue } from '@chakra-ui/react';
import { errorNotification, successNotification } from '@services/popup-notification';
import { useProcessReviewActionMutation } from '@store/api/reviewsAPI';
import { useGetUserInfoQuery } from '@store/api/userAPI';
import { Breakpoint, ButtonType, RoleName } from '@utils/constants';
import { mediaBreakpointUp } from '@utils/functions';
import { ReviewDto, Status, WordDto } from '@utils/types';
import Button from '@components/common/basic/Button';
import ProgressBar from '@components/common/basic/ProgressBar';
import ButtonsContainer from '@components/common/complex/ButtonsContainer';
import Modal from '@components/common/complex/Modal';
import ReviewWordCard from '@components/review/ReviewWordCard';

type Props = {
  review: ReviewDto;
  isOpen: boolean;
  onClose: () => void;
};

export default function StartReviewWindow(props: Props) {
  const { review, isOpen, onClose } = props;

  const [reviewWordDTO, setReviewWordDTO] = useState<WordDto | null>(null);
  const [isModalVisible, setModalVisible] = useState(true);
  const [isFlipped, setFlipped] = useState(false);
  const [isThrown, setThrown] = useState(false);

  const { data: user } = useGetUserInfoQuery();
  const [processReviewAction, { isLoading }] = useProcessReviewActionMutation();

  const fetchReviewAction = (answer: boolean | null) => {
    processReviewAction({ reviewId: review.id!, answer })
      .unwrap()
      .then((response) => {
        if (response != null && response.listOfWordDto && response.listOfWordDto.length > 0) {
          setReviewWordDTO(response.listOfWordDto[0]);
        } else {
          setModalVisible(false);
        }
      })
      .catch((error) => errorNotification('', error.data.message))
      .finally(() => {
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
    if (!isModalVisible) {
      onClose();
    }
  }, [isModalVisible]);

  const pressButton = (answer: boolean | null) => {
    fetchReviewAction(answer);
    setFlipped(false);
    setThrown(true);
  };

  const reviewProgress = ((review.actualSize - review.listOfWordDto!.length) / review.actualSize) * 100;
  const modalWidth = useBreakpointValue({ base: '80vw', xl: '1000px' });

  const getReviewWordName = (reviewWord: WordDto): string => {
    const map: Record<RoleName, string> = {
      [RoleName.USER_ENGLISH]: reviewWord.wordDataDto.nameEnglish,
      [RoleName.USER_CHINESE]: reviewWord.wordDataDto.nameChineseSimplified,
      [RoleName.ADMIN]: '',
    };
    return map[user!.role!];
  };

  return (
    <Modal
      width={modalWidth}
      isOpen={isOpen}
      onClose={onClose}
      header={null}
      body={(
        <Container>
          <ProgressBarContainer>
            <ProgressBar value={reviewProgress} />
          </ProgressBarContainer>
          <CardContainer>
            <ReviewWordCard
              reviewWord={reviewWordDTO}
              isFlipped={isFlipped}
              setFlipped={setFlipped}
              isThrown={isThrown}
              pressButton={pressButton}
              isLoading={!isModalVisible || !reviewWordDTO || isLoading}
            />
            <ButtonsContainer>
              <Button
                buttonText="Forgot"
                buttonType={ButtonType.BUTTON_RED}
                onClick={() => pressButton(false)}
                isDisabled={!isModalVisible || !reviewWordDTO || isLoading}
              />
              <Button
                buttonText="Remembered"
                buttonType={ButtonType.BUTTON}
                onClick={() => pressButton(true)}
                isDisabled={!isModalVisible || !reviewWordDTO || isLoading}
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
  overflow-x: hidden;
  overflow-y: hidden;
  
  ${mediaBreakpointUp(Breakpoint.TABLET)} {
    gap: 70px;
    margin: 0 0 50px 0;
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
