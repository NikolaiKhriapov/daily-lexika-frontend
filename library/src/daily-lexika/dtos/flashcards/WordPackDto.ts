import { Category, Platform } from '../types';

export interface WordPackDto {
  name: string;
  description: string;
  category: Category;
  platform?: Platform;
  wordsTotal?: number;
  wordsNew?: number;
  reviewId?: number;
}
