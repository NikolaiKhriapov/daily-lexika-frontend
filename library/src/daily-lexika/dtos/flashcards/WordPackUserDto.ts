import { Category } from '../../enumerations/Category';
import { Platform } from '../../enumerations/Platform';

export interface WordPackUserDto {
  id?: number;
  name: string;
  description: string;
  category: Category;
  platform?: Platform;
  userId?: number;
  wordsTotal?: number;
  wordsNew?: number;
  reviewId?: number;
}
