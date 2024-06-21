import * as Yup from 'yup';
import { TFunction } from 'i18next';

export default class ValidationHelper {
  public static nameValidator(t: TFunction<"translation", undefined>) {
    return Yup.string().trim()
      .required(' ')
      .max(15, t('validation.maxLength').replace('{0}', '15'));
  }

  public static emailValidator(t: TFunction<"translation", undefined>) {
    return Yup.string().trim()
      .required(' ')
      .email(t('validation.email'));
  }

  public static passwordValidator(t: TFunction<"translation", undefined>) {
    return Yup.string().trim()
      .required(' ')
      .min(8, t('validation.minLength').replace('{0}', '8'))
      .max(20, t('validation.maxLength').replace('{0}', '20'));
  }

  public static passwordRepeatValidator(t: TFunction<"translation", undefined>) {
    return Yup.string().trim()
      .required(' ')
      .oneOf([Yup.ref('passwordNewFirst')], t('validation.passwordsMatch'));
  }

  public static maxNewWordsPerDayValidator(t: TFunction<"translation", undefined>) {
    return Yup.number()
      .min(1, t('validation.minNumber').replace('{0}', '1'))
      .max(20, t('validation.maxNumber').replace('{0}', '20'))
      .required(' ');
  }

  public static maxReviewWordsPerDayValidator(t: TFunction<"translation", undefined>) {
    return Yup.number()
      .min(1, t('validation.minNumber').replace('{0}', '1'))
      .max(50, t('validation.maxNumber').replace('{0}', '50'))
      .required(' ');
  }
}
