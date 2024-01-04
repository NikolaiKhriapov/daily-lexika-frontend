import * as Yup from 'yup';
import { TbCards } from 'react-icons/tb';
import styled from 'styled-components/macro';
import React from 'react';
import { createReview } from '../../services/reviews';
import { errorNotification, successNotification } from '../../services/popup-notification';
import { ReviewDTO, WordPackDTO } from '../../utils/types';
import TextInput from '../common/complex/TextInput';
import Text from '../common/basic/Text';
import InputFieldsWithButton from '../common/complex/InputFieldsWithButton';
import Modal from '../common/complex/Modal';
import { Size } from '../../utils/constants';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  wordPackDTO: WordPackDTO;
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
  isButtonDisabled: boolean;
};

export default function CreateReviewWindow(props: Props) {
  const { isOpen, onClose, wordPackDTO, setReload, isButtonDisabled } = props;

  const initialValues = {
    maxNewWordsPerDay: 5,
    maxReviewWordsPerDay: 20,
    wordPackName: `${wordPackDTO.name}`,
  };

  const validationSchema = Yup.object({
    maxNewWordsPerDay: Yup.number()
      .min(1, 'Must be at least 1')
      .max(20, 'Must be less than 20')
      .required('Required'),
    maxReviewWordsPerDay: Yup.number()
      .min(1, 'Must be at least 1')
      .max(50, 'Must be less than 50')
      .required('Required'),
  });

  const handleOnSubmit = (reviewDTO: ReviewDTO, { setSubmitting }: any) => {
    setSubmitting(true);
    createReview(reviewDTO)
      .then(() => {
        successNotification('Review saved', `${wordPackDTO.name} was successfully saved`);
        setReload(true);
      })
      .catch((error) => errorNotification(error.code, error.response.data.message))
      .finally(() => setSubmitting(false));
  };

  return (
    <Modal
      size={Size.MD}
      isOpen={isOpen}
      onClose={onClose}
      header={wordPackDTO.name}
      body={(
        <>
          <TotalWords>
            <TbCards />
            <Text>{wordPackDTO.totalWords}</Text>
          </TotalWords>
          <Description>
            <Text>{wordPackDTO.description}</Text>
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
              </>
            )}
            buttonText="Submit"
            onSubmit={handleOnSubmit}
            isButtonDisabled={isButtonDisabled}
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
