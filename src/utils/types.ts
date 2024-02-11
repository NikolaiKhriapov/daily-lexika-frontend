import { JwtPayload } from 'jwt-decode';
import { Platform, RoleName } from '@utils/constants';

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

export interface CustomJwtPayload extends JwtPayload {
  id: number;
  name: string;
  role: RoleName;
}

export interface PasswordUpdateRequest {
  passwordCurrent: string;
  passwordNew: string;
}

export interface UserDTO {
  id?: number;
  name?: string;
  email?: string;
  password?: string;
  role?: RoleName;
  roleStatistics?: RoleStatisticsDTO[];
}

export interface RoleStatisticsDTO {
  id: number;
  roleName: string;
  currentStreak: number;
  dateOfLastStreak: string;
  recordStreak: number;
}

export interface NotificationDTO {
  notificationId: number;
  toUserId: number;
  toUserEmail: string;
  sender: string;
  subject: string;
  message: string;
  sentAt: string;
  isRead: boolean;
}

export interface ReviewDTO {
  id?: number;
  userId?: number;
  maxNewWordsPerDay: number;
  maxReviewWordsPerDay: number;
  wordPackDTO: WordPackDTO;
  listOfWordDTO?: WordDTO[];
  actualSize: number;
  dateLastCompleted?: string;
  dateGenerated?: string;
}

export interface WordDataDTO {
  id: number;
  nameChineseSimplified: string;
  transcription: string;
  nameEnglish: string;
  nameRussian: string;
  definition: string;
  examples: string[];
  listOfWordPackNames: string[];
  platform: Platform;
}

export interface WordDTO {
  id: number;
  wordDataDTO: WordDataDTO;
  status: Status;
  currentStreak: number;
  totalStreak: number;
  occurrence: number;
  dateOfLastOccurrence: string;
}

export interface WordPackDTO {
  name: string;
  description: string;
  category: Category;
  totalWords: number;
  reviewId?: number;
}

export interface StatisticsDTO {
  currentStreak?: number;
  recordStreak?: number;
  wordsKnown: number;
  // charactersKnown: number;
  // idiomsKnown: number;
  listOfReviewStatisticsDTO: ReviewStatisticsDTO[];
}

export interface ReviewStatisticsDTO {
  id: number;
  wordPackName: string;
  wordsNew: number;
  wordsInReview: number;
  wordsKnown: number;
}

export enum Status {
  NEW = 'NEW',
  IN_REVIEW = 'IN_REVIEW',
  KNOWN = 'KNOWN',
}

export enum Category {
  HSK = 'HSK',
  WORK = 'Work',
  NEWS = 'News',
  SPORT = 'Sport',
  FOOD = 'Food',
  TRAVEL = 'Travel',

  SPEAKOUT_STARTER = 'Speakout Starter',
  SPEAKOUT_ELEMENTARY = 'Speakout Elementary',
  SPEAKOUT_PRE_INTERMEDIATE = 'Speakout Pre-intermediate',
  SPEAKOUT_INTERMEDIATE = 'Speakout Intermediate',
  SPEAKOUT_UPPER_INTERMEDIATE = 'Speakout Upper-intermediate',

  CUSTOM = 'Custom',
}
