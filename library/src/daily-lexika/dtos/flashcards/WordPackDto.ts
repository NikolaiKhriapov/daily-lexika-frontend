import { Category } from '../../enumerations/Category';
import { Platform } from '../../enumerations/Platform';

export interface WordPackDto {
  name: string;
  description: string;
  category: Category;
  platform?: Platform;
  wordsTotal?: number;
  wordsNew?: number;
  reviewId?: number;
}
