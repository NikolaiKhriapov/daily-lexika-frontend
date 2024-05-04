import React, { Dispatch, SetStateAction } from 'react';
import { TbCards } from 'react-icons/tb';
import styled from 'styled-components';
import * as Yup from 'yup';
import { errorNotification, successNotification } from '@services/app/popup-notification';
import { useCreateReviewMutation, useUpdateReviewMutation } from '@store/api/reviewsAPI';
import { useGetUserInfoQuery } from '@store/api/userAPI';
import { Size } from '@utils/constants';
import { ReviewDto, WordPackDto } from '@utils/types';
import Spinner from '@components/ui-common/basic/Spinner';
import Text from '@components/ui-common/basic/Text';
import InputFieldsWithButton from '@components/ui-common/complex/InputFieldsWithButton';
import Modal from '@components/ui-common/complex/Modal';
import TextInput from '@components/ui-common/complex/TextInput';
import ValidationHelper from '@helpers/ValidationHelper';
import WordDataHelper from '@helpers/WordDataHelper';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  wordPack: WordPackDto;
  review?: ReviewDto;
  setDisabledButton: Dispatch<SetStateAction<boolean>>;
};

export default function CreateOrUpdateReviewWindow(props: Props) {
  const { isOpen, onClose, wordPack, review = null, setDisabledButton } = props;

  const { data: user } = useGetUserInfoQuery();
  const [updateReview] = useUpdateReviewMutation();
  const [createReview] = useCreateReviewMutation();

  if (!user) return <Spinner />;

  const initialValues = {
    maxNewWordsPerDay: review?.maxNewWordsPerDay || 5,
    maxReviewWordsPerDay: review?.maxReviewWordsPerDay || 20,
    wordPackDto: wordPack,
  };

  const validationSchema = Yup.object({
    maxNewWordsPerDay: ValidationHelper.maxNewWordsPerDayValidator(),
    maxReviewWordsPerDay: ValidationHelper.maxReviewWordsPerDayValidator(),
  });

  const handleOnSubmit = (reviewDTO: ReviewDto) => {
    setDisabledButton(true);
    onClose();
    if (review) {
      updateReview({ reviewId: review!.id!, reviewDTO })
        .unwrap()
        .then(() => successNotification('Review saved', `${WordDataHelper.getOriginalWordPackName(wordPack.name, user)} was successfully saved`))
        .catch((error) => errorNotification('', error))
        .finally(() => setDisabledButton(false));
    } else {
      createReview(reviewDTO)
        .unwrap()
        .then(() => successNotification('Review saved', `${WordDataHelper.getOriginalWordPackName(wordPack.name, user)} was successfully saved`))
        .catch((error) => errorNotification('', error))
        .finally(() => setDisabledButton(false));
    }
  };

  return (
    <Modal
      size={Size.MD}
      width='450px'
      isOpen={isOpen}
      onClose={onClose}
      header={WordDataHelper.getOriginalWordPackName(wordPack.name, user)}
      body={(
        <>
          <TotalWords>
            <TbCards />
            <Text>{wordPack.totalWords}</Text>
          </TotalWords>
          <Description>
            <Text>{wordPack.description}</Text>
          </Description>
          <InputFieldsWithButton
            validateOnMount
            initialValues={initialValues}
            validationSchema={validationSchema}
            inputElements={(
              <>
                <TextInput
                  label="Max New Words Per Day"
                  name="maxNewWordsPerDay"
                  type="number"
                  placeholder="1"
                />
                <TextInput
                  label="Max Review Words Per Day"
                  name="maxReviewWordsPerDay"
                  type="number"
                  placeholder="1"
                />
                <Text>{'These settings can be edited at any time. Stick with the defaults if you\'re not sure.'}</Text>
              </>
            )}
            buttonText="Submit"
            onSubmit={handleOnSubmit}
            isButtonDisabled={false}
          />
        </>
      )}
    />
  );
}

const TotalWords = styled.div`
  display: flex;
  flex-direction: row;
  gap: 4px;
  align-items: center;
`;

const Description = styled.div`
`;
