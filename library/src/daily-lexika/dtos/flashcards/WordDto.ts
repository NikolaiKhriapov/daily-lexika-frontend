import { WordDataDto } from './WordDataDto';
import { Status } from '../../enumerations/Status';

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
