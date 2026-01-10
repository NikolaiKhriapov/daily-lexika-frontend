import { Platform } from '../../enumerations/Platform';

export interface WordDataCreateDto {
  nameChinese: string;
  transcription: string;
  nameEnglish: string;
  nameRussian: string;
  definition: string;
  examples: { [key: string]: string }[];
  listOfWordPackIds: number[];
  platform: Platform;
}
