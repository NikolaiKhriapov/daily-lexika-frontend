import { Status } from '../types';
import { WordDataDto } from './WordDataDto';

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
