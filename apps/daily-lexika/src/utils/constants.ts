import { SUPPORT_EMAIL } from '@library/shared/utils';

export enum AppInfo {
  TITLE = 'Daily Lexika',
  DESCRIPTION = 'Language Learning Application',
  LINK_GOOGLE_PLAY = 'https://play.google.com/store/apps/details?id=com.dailylexika.twa',
}

export enum PrivacyPolicyInfo {
  TITLE = 'Privacy Policy',
  DESCRIPTION = 'Language Learning Application',
}

export const DbInfo = {
  EXAMS_EN: 'IELTS/TOEFL',
  EXAMS_CH: 'HSK',
  WORDS_EN: 5000,
  WORDS_CH: 11000,
};

export const EmailLinks = {
  Blank: `mailto:${SUPPORT_EMAIL}`,
  ContactSupport: `mailto:${SUPPORT_EMAIL}?subject=Support`,
  Feedback: `mailto:${SUPPORT_EMAIL}?subject=Feedback`,
  PasswordRecovery: (platform: string) => `mailto:${SUPPORT_EMAIL}?subject=${EmailTemplates.PASSWORD_RECOVERY_SUBJECT}&body=${EmailTemplates.PASSWORD_RECOVERY_BODY.replace('{0}', platform)}`,
  ReportError: (word: string) => `mailto:${SUPPORT_EMAIL}?subject=${EmailTemplates.REPORT_ERROR_SUBJECT}&body=${EmailTemplates.REPORT_ERROR_BODY.replace('{0}', word)}`,
};

enum EmailTemplates {
  PASSWORD_RECOVERY_SUBJECT = 'Password Recovery',
  PASSWORD_RECOVERY_BODY = 'Hi there, I seem to have forgotten my password for the {0} platform. Could you please provide assistance in resetting it?',
  REPORT_ERROR_SUBJECT = 'Content Inaccuracy',
  REPORT_ERROR_BODY = 'Hi there, I seem to have found an inaccuracy with the content for the word \'{0}\'. Additional information: ',
}
