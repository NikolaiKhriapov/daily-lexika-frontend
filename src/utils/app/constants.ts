export enum AppInfo {
  TITLE = 'Daily Lexika',
  DESCRIPTION = 'Language Learning Application',
  EMAIL = 'kolyakhryapov@gmail.com',
  APP_VERSION = '2024.6.0',
  LINK_GOOGLE_PLAY = 'https://play.google.com/store/apps/details?id=com.dailylexika.twa',
}

export const DbInfo = {
  EXAMS_EN: 'IELTS/TOEFL',
  EXAMS_CH: 'HSK',
  WORDS_EN: 5000,
  WORDS_CH: 11000,
};

export const EmailLinks = {
  Blank: `mailto:${AppInfo.EMAIL}`,
  ContactSupport: `mailto:${AppInfo.EMAIL}?subject=Support`,
  Feedback: `mailto:${AppInfo.EMAIL}?subject=Feedback`,
  PasswordRecovery: (platform: string) => `mailto:${AppInfo.EMAIL}?subject=${EmailTemplates.PASSWORD_RECOVERY_SUBJECT}&body=${EmailTemplates.PASSWORD_RECOVERY_BODY.replace('{0}', platform)}`,
  ReportError: (word: string) => `mailto:${AppInfo.EMAIL}?subject=${EmailTemplates.REPORT_ERROR_SUBJECT}&body=${EmailTemplates.REPORT_ERROR_BODY.replace('{0}', word)}`,
};
enum EmailTemplates {
  PASSWORD_RECOVERY_SUBJECT = 'Password Recovery',
  PASSWORD_RECOVERY_BODY = 'Hi there, I seem to have forgotten my password for the {0} platform. Could you please assist me in resetting it?',
  REPORT_ERROR_SUBJECT = 'Content Inaccuracy',
  REPORT_ERROR_BODY = 'Hi there, I seem to have found an inaccuracy with the content for the word \'{0}\'. Additional information: ',
}

export enum RoleName {
  USER_ENGLISH = 'USER_ENGLISH',
  USER_CHINESE = 'USER_CHINESE',
  ADMIN = 'ADMIN',
}

export type RoleNameBase = RoleName.USER_ENGLISH | RoleName.USER_CHINESE;
export type RoleNameAdmin = RoleName.ADMIN;

export enum Platform {
  ENGLISH = 'ENGLISH',
  CHINESE = 'CHINESE',
}

export enum AuthFormType {
  LOGIN = 'login',
  REGISTER = 'register',
}
