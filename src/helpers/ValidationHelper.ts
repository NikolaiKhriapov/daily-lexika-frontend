import * as Yup from 'yup';

export default class ValidationHelper {
  public static nameValidator() {
    return Yup.string().trim()
      .required(' ')
      .max(15, 'Must be 15 characters or less');
  }

  public static emailValidator() {
    return Yup.string().trim()
      .required(' ')
      .email('Invalid email address');
  }

  public static passwordValidator() {
    return Yup.string().trim()
      .required(' ')
      .min(8, 'Must be at least 8 characters')
      .max(20, 'Must be 20 characters or less');
  }

  public static passwordRepeatValidator() {
    return Yup.string().trim()
      .required(' ')
      .oneOf([Yup.ref('passwordNewFirst')], 'Passwords must match');
  }

  public static maxNewWordsPerDayValidator() {
    return Yup.number()
      .min(1, 'Must be at least 1')
      .max(20, 'Must be less than 20')
      .required(' ');
  }

  public static maxReviewWordsPerDayValidator() {
    return Yup.number()
      .min(1, 'Must be at least 1')
      .max(50, 'Must be less than 50')
      .required(' ');
  }
}
