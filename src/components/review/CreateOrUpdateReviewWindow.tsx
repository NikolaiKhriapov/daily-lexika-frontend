import React, { useContext } from 'react';
import { TbCards } from 'react-icons/tb';
import styled from 'styled-components';
import * as Yup from 'yup';
import { AuthContext } from '@context/AuthContext';
import { successNotification } from '@services/popup-notification';
import { createReview } from '@services/reviews';
import { Size } from '@utils/constants';
import { getOriginalWordPackName } from '@utils/functions';
import { ReviewDTO, WordPackDTO } from '@utils/types';
import Text from '@components/common/basic/Text';
import InputFieldsWithButton from '@components/common/complex/InputFieldsWithButton';
import Modal from '@components/common/complex/Modal';
import TextInput from '@components/common/complex/TextInput';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  wordPackDTO: WordPackDTO;
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
  isButtonDisabled: boolean;
  reviewDTO?: ReviewDTO;
};

export default function CreateOrUpdateReviewWindow(props: Props) {
  const { isOpen, onClose, wordPackDTO, setReload, isButtonDisabled, reviewDTO = null } = props;

  const { user } = useContext(AuthContext);

  const initialValues = {
    maxNewWordsPerDay: reviewDTO ? reviewDTO.maxNewWordsPerDay : 5,
    maxReviewWordsPerDay: reviewDTO ? reviewDTO.maxReviewWordsPerDay : 20,
    wordPackDTO,
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

  const handleOnSubmit = (review: ReviewDTO, { setSubmitting }: any) => {
    setSubmitting(true);
    createReview(review)
      .then(() => {
        successNotification('Review saved', `${getOriginalWordPackName(wordPackDTO.name, user)} was successfully saved`);
        setReload(true);
      })
      .catch((error) => console.error(error.code, error.response.data.message))
      .finally(() => setSubmitting(false));
  };

  return (
    <Modal
      size={Size.MD}
      width='450px'
      isOpen={isOpen}
      onClose={onClose}
      header={getOriginalWordPackName(wordPackDTO.name, user)}
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
                <Text>{'These settings can be edited at any time. Stick with the defaults if you\'re not sure.'}</Text>
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
