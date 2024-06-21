import React, { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { TbCards } from 'react-icons/tb';
import styled from 'styled-components';
import * as Yup from 'yup';
import { errorNotification, successNotification } from '@services/app/popup-notification';
import { useCreateReviewMutation, useUpdateReviewMutation } from '@store/api/reviewsAPI';
import { useGetUserQuery } from '@store/api/userAPI';
import { Size } from '@utils/constants';
import { ReviewDto, WordPackDto } from '@utils/types';
import Spinner from '@components/ui-common/basic/Spinner';
import Text from '@components/ui-common/basic/Text';
import InputFieldsWithButton from '@components/ui-common/complex/InputFieldsWithButton';
import Modal from '@components/ui-common/complex/Modal';
import TextInput from '@components/ui-common/complex/TextInput';
import DateHelper from '@helpers/DateHelper';
import I18nHelper from '@helpers/I18nHelper';
import LocaleHelper from '@helpers/LocaleHelper';
import ValidationHelper from '@helpers/ValidationHelper';
import WordDataHelper from '@helpers/WordDataHelper';
import WordPackHelper from '@helpers/WordPackHelper';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  wordPack: WordPackDto;
  review?: ReviewDto;
  setDisabledButton: Dispatch<SetStateAction<boolean>>;
};

export default function CreateOrUpdateReviewWindow(props: Props) {
  const { isOpen, onClose, wordPack, review = null, setDisabledButton } = props;

  const { t } = useTranslation();
  const { data: user } = useGetUserQuery();
  const [updateReview] = useUpdateReviewMutation();
  const [createReview] = useCreateReviewMutation();

  if (!user) return <Spinner />;

  const initialValues = {
    maxNewWordsPerDay: review?.maxNewWordsPerDay || 5,
    maxReviewWordsPerDay: review?.maxReviewWordsPerDay || 20,
    wordPackDto: wordPack,
  };

  const validationSchema = Yup.object({
    maxNewWordsPerDay: ValidationHelper.maxNewWordsPerDayValidator(t),
    maxReviewWordsPerDay: ValidationHelper.maxReviewWordsPerDayValidator(t),
  });

  const handleOnSubmit = (reviewDTO: ReviewDto) => {
    setDisabledButton(true);
    onClose();
    if (review) {
      updateReview({ reviewId: review!.id!, reviewDTO })
        .unwrap()
        .then(() => successNotification(t('CreateOrUpdateReviewWindow.reviewUpdated'), `${WordDataHelper.getOriginalWordPackName(wordPack.name, user)} was successfully saved`))
        .catch((error) => errorNotification('', error))
        .finally(() => setDisabledButton(false));
    } else {
      createReview(reviewDTO)
        .unwrap()
        .then(() => successNotification(t('CreateOrUpdateReviewWindow.reviewSaved'), `${WordDataHelper.getOriginalWordPackName(wordPack.name, user)} was successfully saved`))
        .catch((error) => errorNotification('', error))
        .finally(() => setDisabledButton(false));
    }
  };

  const calculateDaysToFinish = (value: number) => wordPack.wordsNew && (wordPack.wordsNew / value + 1).toFixed(0);
  const getHint = (value: string) => {
    const days = calculateDaysToFinish(Number(value));
    return days
      ? t('CreateOrUpdateReviewWindow.maxNewWordsPerDay.hint')
        .replace('{0}', days)
        .replace('{1}', DateHelper.getDateAfterDaysMidnightUtcAsDateString(Number(days), LocaleHelper.getLocaleFromUser(user)))
      : '';
  };

  return (
    <Modal
      size={Size.MD}
      width='450px'
      isOpen={isOpen}
      onClose={onClose}
      header={I18nHelper.getWordPackNameTranslated(wordPack.name, user, t)}
      body={(
        <>
          <TotalWords>
            <TbCards />
            <Text>{wordPack.wordsTotal}</Text>
          </TotalWords>
          <Description>
            <Text>{WordPackHelper.getDescriptionForLanguage(wordPack, user)}</Text>
          </Description>
          <InputFieldsWithButton
            validateOnMount
            initialValues={initialValues}
            validationSchema={validationSchema}
            inputElements={(
              <>
                <TextInput
                  label={t('CreateOrUpdateReviewWindow.maxNewWordsPerDay.label')}
                  name="maxNewWordsPerDay"
                  type="number"
                  placeholder="1"
                  getHint={getHint}
                />
                <TextInput
                  label={t('CreateOrUpdateReviewWindow.maxReviewWordsPerDay')}
                  name="maxReviewWordsPerDay"
                  type="number"
                  placeholder="1"
                />
                <Text>{t('CreateOrUpdateReviewWindow.hint')}</Text>
              </>
            )}
            buttonText={!review ? t('buttonText.create') : t('buttonText.update')}
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
