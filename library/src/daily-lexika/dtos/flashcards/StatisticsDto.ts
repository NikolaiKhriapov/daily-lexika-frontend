import { ReviewStatisticsDto } from './ReviewStatisticsDto';

export interface StatisticsDto {
  currentStreak?: number;
  recordStreak?: number;
  wordsKnown: number;
  charactersKnown: number;
  listOfReviewStatisticsDto: ReviewStatisticsDto[];
}
