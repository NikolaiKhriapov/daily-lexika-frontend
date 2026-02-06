import { Category, ReviewDto, WordPackUserDto } from '@library/daily-lexika';

export const placeholderWordPack: WordPackUserDto = {
  id: -1,
  name: '0000000000',
  description: '',
  category: Category.CUSTOM,
};

export const placeholderReview: ReviewDto = {
  id: -1,
  maxNewWordsPerDay: -1,
  maxReviewWordsPerDay: -1,
  wordPackId: -1,
  wordPackDto: placeholderWordPack,
  actualSize: -1,
};
