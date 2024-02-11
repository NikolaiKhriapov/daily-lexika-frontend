export enum AppInfo {
  NAME = 'Daily Lexika',
  DESCRIPTION = 'Language Learning Application',
  EMAIL = 'nikolai.khriapov@icloud.com',
  APP_VERSION = '2024.3.0',
  EMAIL_PASSWORD_RECOVERY_SUBJECT = 'Password Recovery',
  EMAIL_PASSWORD_RECOVERY_BODY = 'Hi there, I seem to have forgotten my password for the English/Chinese platform. Could you please assist me in resetting it?',
}

export enum LocalStorage {
  ACCESS_TOKEN = 'access-token',
  COLOR_MODE = 'chakra-ui-color-mode',
}

export enum RoleName {
  ADMIN = 'ADMIN',
  USER_CHINESE = 'USER_CHINESE',
  USER_ENGLISH = 'USER_ENGLISH',
}

export enum Breakpoint {
  BASE = '0px',
  PHONE = '320px',
  PHONE_LG = '400px',
  TABLET = '768px',
  LG = '960px',
  DESKTOP = '1200px',
  XXL = '1536px',
}

export enum Page {
  LANDING = '/',
  AUTH = '/auth',
  REVIEWS = '/reviews',
  WORD_PACKS = '/word-packs',
  STATISTICS = '/statistics',
}

export enum Platform {
  ENGLISH = 'ENGLISH',
  CHINESE = 'CHINESE',
}

export enum AuthFormType {
  LOGIN = 'login',
  REGISTER = 'register',
}

export enum Size {
  XXS = '2xs',
  XS = 'xs',
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
  XL = 'xl',
  XXL = '2xl',
  XXXL = '3xl',
  XXXXL = '4xl',
  XXXXXL = '5xl',
  XXXXXXL = '6xl',
}

export enum FontWeight {
  HAIRLINE = 'hairline',
  THIN = 'thin',
  LIGHT = 'light',
  NORMAL = 'normal',
  MEDIUM = 'medium',
  SEMIBOLD = 'semibold',
  BOLD = 'bold',
  EXTRABOLD = 'extrabold',
  BLACK = 'black',
}

export enum ButtonType {
  BUTTON = 'standard',
  BUTTON_RED = 'redOnHover',
  SUBMIT = 'submit',
  RESET = 'reset',
  LINK = 'link',
}

export enum ButtonWithIconType {
  PREVIEW = 'preview',
  CHANGE = 'change',
  REFRESH = 'refresh',
  DELETE = 'delete',
  ADD_WORD = 'add-word',
  REMOVE_WORD = 'remove-word',
}
