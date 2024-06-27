import { WordPackDto } from './WordPackDto';
import { WordDto } from './WordDto';

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
