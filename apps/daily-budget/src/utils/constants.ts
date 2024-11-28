import { SUPPORT_EMAIL } from '@library/shared/utils';

export enum AppInfo {
  TITLE = 'Daily Budget',
  DESCRIPTION = 'Daily Budget Application',
  LINK_GOOGLE_PLAY = '#',
}

export enum PrivacyPolicyInfo {
  TITLE = 'Privacy Policy',
  DESCRIPTION = 'Daily Budget Application',
}

enum EmailTemplates {
  PASSWORD_RECOVERY_SUBJECT = 'Password Recovery',
  PASSWORD_RECOVERY_BODY = 'Hi there, I seem to have forgotten my password. Could you please provide assistance in resetting it?',
}

export const EmailLinks = {
  Blank: `mailto:${SUPPORT_EMAIL}`,
  ContactSupport: `mailto:${SUPPORT_EMAIL}?subject=Support`,
  Feedback: `mailto:${SUPPORT_EMAIL}?subject=Feedback`,
  PasswordRecovery: `mailto:${SUPPORT_EMAIL}?subject=${EmailTemplates.PASSWORD_RECOVERY_SUBJECT}&body=${EmailTemplates.PASSWORD_RECOVERY_BODY}`,
};
