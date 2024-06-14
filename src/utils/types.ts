import { Platform, RoleName } from '@utils/app/constants';

export interface RegistrationRequest {
  name: string;
  email: string;
  password: string;
  platform: Platform;
}

export interface AuthenticationRequest {
  email: string;
  password: string;
  platform: Platform;
}

export interface AuthenticationResponse {
  token: string;
}

export interface PasswordUpdateRequest {
  passwordCurrent: string;
  passwordNew: string;
}

export interface AccountDeletionRequest {
  passwordCurrent: string;
}

export interface UserDto {
  id?: number;
  name?: string;
  email?: string;
  role?: RoleName;
  roleStatistics?: RoleStatisticsDto[];
  translationLanguage?: Language;
  interfaceLanguage?: Language;
  dateOfRegistration?: string;
}

export interface RoleStatisticsDto {
  id: number;
  roleName: string;
  currentStreak: number;
  dateOfLastStreak: string;
  recordStreak: number;
}

export interface NotificationDto {
  notificationId: number;
  toUserId: number;
  toUserEmail: string;
  sender: string;
  subject: string;
  message: string;
  sentAt: string;
  isRead: boolean;
}

export interface ReviewDto {
  id?: number;
  userId?: number;
  maxNewWordsPerDay: number;
  maxReviewWordsPerDay: number;
  wordPackDto: WordPackDto;
  listOfWordDto?: WordDto[];
  actualSize: number;
  dateLastCompleted?: string;
  dateGenerated?: string;
}

export interface WordDataDto {
  id: number;
  nameChinese: string;
  transcription: string;
  nameEnglish: string;
  nameRussian: string;
  definition: string;
  examples: string[];
  listOfWordPackNames: string[];
  platform: Platform;
}

export interface WordDto {
  id: number;
  userId: number;
  wordDataDto: WordDataDto;
  status: Status;
  currentStreak: number;
  totalStreak: number;
  occurrence: number;
  dateOfLastOccurrence: string;
}

export interface WordPackDto {
  name: string;
  description: string;
  category: Category;
  platform?: Platform;
  wordsTotal?: number;
  wordsNew?: number;
  reviewId?: number;
}

export interface StatisticsDto {
  currentStreak?: number;
  recordStreak?: number;
  wordsKnown: number;
  charactersKnown: number;
  listOfReviewStatisticsDto: ReviewStatisticsDto[];
}

export interface ReviewStatisticsDto {
  reviewId: number;
  wordPackName: string;
  wordsNew: number;
  wordsInReview: number;
  wordsKnown: number;
}

export enum Language {
  ENGLISH = 'ENGLISH',
  RUSSIAN = 'RUSSIAN',
  CHINESE = 'CHINESE',
}

export enum Status {
  NEW = 'NEW',
  IN_REVIEW = 'IN_REVIEW',
  KNOWN = 'KNOWN',
}

export enum Category {
  HSK = 'HSK',
  CEFR = 'CEFR',
  OTHER = 'OTHER',
  CUSTOM = 'CUSTOM',
}

export const placeholderWordPack: WordPackDto = {
  name: '0000000000',
  description: '',
  category: Category.CUSTOM,
};

export const placeholderReview: ReviewDto = {
  id: -1,
  maxNewWordsPerDay: -1,
  maxReviewWordsPerDay: -1,
  wordPackDto: placeholderWordPack,
  actualSize: -1,
};
