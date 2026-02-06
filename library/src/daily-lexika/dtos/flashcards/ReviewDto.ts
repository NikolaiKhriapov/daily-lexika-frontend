import { WordDto } from './WordDto';
import { WordPackUserDto } from './WordPackUserDto';

export interface ReviewDto {
  id?: number;
  userId?: number;
  maxNewWordsPerDay: number;
  maxReviewWordsPerDay: number;
  wordPackId: number;
  wordPackDto: WordPackUserDto;
  listOfWordDto?: WordDto[];
  actualSize: number;
  dateLastCompleted?: string;
  dateGenerated?: string;
}
