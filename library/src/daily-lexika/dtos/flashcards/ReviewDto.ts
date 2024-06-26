import { WordDto, WordPackDto } from '../types';

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
