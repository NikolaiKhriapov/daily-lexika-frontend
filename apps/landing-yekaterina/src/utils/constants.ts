export enum LandingInfo {
  TITLE = 'Екатерина Щербакова',
  DESCRIPTION = 'Обучение английскому языку',
}

export enum SectionId {
  INTRO = 'intro',
  DEMO_CLASS = 'demo-class',
  CONSULTATION = 'consultation',
  FEEDBACK = 'feedback',
  DISCOUNTS = 'discounts',
  FAQ = 'faq',
}

export enum ContactMethod {
  TELEGRAM = 'Telegram',
  WHATSAPP = 'WhatsApp',
  INSTAGRAM = 'Instagram',
  EMAIL = 'Email',
}

export enum LanguageLevel {
  UNKNOWN = 'Unknown',
  A1 = 'A1',
  A2 = 'A2',
  B1 = 'B1',
  B2 = 'B2',
  C1 = 'C1',
  C2 = 'C2',
}

export interface DemoSubmitRequest {
  name: string;
  contactMethod: string;
  contactId: string;
  languageLevel: string;
  city: string;
}
