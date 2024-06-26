import { Category, ReviewDto, WordPackDto } from '@library/daily-lexika';

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
