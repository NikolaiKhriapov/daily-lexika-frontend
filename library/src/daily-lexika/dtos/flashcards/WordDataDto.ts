import { Platform } from '../types';

export interface WordDataDto {
  id: number;
  nameChinese: string;
  transcription: string;
  nameEnglish: string;
  nameRussian: string;
  definition: string;
  examples: string[];
  listOfWordPackNames: string[];
  platform: Platform;
}
