export enum AppInfo {
  TITLE = 'Daily Lexika',
  DESCRIPTION = 'Language Learning Application',
  EMAIL = 'nikolai.khriapov@icloud.com',
  APP_VERSION = '2024.5.0',
}

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
  ADMIN = 'ADMIN',
  USER_CHINESE = 'USER_CHINESE',
  USER_ENGLISH = 'USER_ENGLISH',
}

export enum Platform {
  ENGLISH = 'ENGLISH',
  CHINESE = 'CHINESE',
}

export enum AuthFormType {
  LOGIN = 'login',
  REGISTER = 'register',
}
