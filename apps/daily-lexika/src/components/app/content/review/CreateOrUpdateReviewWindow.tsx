import React, { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { TbCards } from 'react-icons/tb';
import styled from 'styled-components';
import * as Yup from 'yup';
import I18nHelper from '@daily-lexika/helpers/I18nHelper';
import LocaleHelper from '@daily-lexika/helpers/LocaleHelper';
import ValidationHelper from '@daily-lexika/helpers/ValidationHelper';
import WordDataHelper from '@daily-lexika/helpers/WordDataHelper';
import WordPackHelper from '@daily-lexika/helpers/WordPackHelper';
import { useCreateReviewMutation, useUpdateReviewMutation } from '@daily-lexika/store/api/reviewsAPI';
import { useGetUserQuery } from '@daily-lexika/store/api/userAPI';
import { ReviewDto, WordPackUserDto } from '@library/daily-lexika';
import { errorNotification, successNotification } from '@library/shared/services';
import { InputFieldsWithButton, Modal, Spinner, Text, TextInput } from '@library/shared/ui';
import { DateTimeUtil, Size } from '@library/shared/utils';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  wordPack: WordPackUserDto;
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
    wordPackId: wordPack.id!,
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
        .then(() => successNotification(t('CreateOrUpdateReviewWindow.reviewUpdated'), `${WordDataHelper.getOriginalWordPackName(wordPack.name)} was successfully saved`))
        .catch((error) => errorNotification('', error))
        .finally(() => setDisabledButton(false));
    } else {
      createReview(reviewDTO)
        .unwrap()
        .then(() => successNotification(t('CreateOrUpdateReviewWindow.reviewSaved'), `${WordDataHelper.getOriginalWordPackName(wordPack.name)} was successfully saved`))
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
        .replace('{1}', DateTimeUtil.getDateAfterDaysMidnightUtcAsDateString(Number(days), LocaleHelper.getLocaleFromUser(user)))
      : '';
  };

  return (
    <Modal
      size={Size.MD}
      width='450px'
      isOpen={isOpen}
      onClose={onClose}
      header={I18nHelper.getWordPackNameTranslated(wordPack.name, t)}
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
