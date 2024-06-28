import { Platform } from '../../enumerations/Platform';

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
