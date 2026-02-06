import { Category } from '../../enumerations/Category';
import { Platform } from '../../enumerations/Platform';

export interface WordPackCreateDto {
  name: string;
  description: string;
  category: Category;
  platform: Platform;
}
