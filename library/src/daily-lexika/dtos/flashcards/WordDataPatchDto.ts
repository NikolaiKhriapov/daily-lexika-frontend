export interface WordDataPatchDto {
  nameChinese?: string;
  transcription?: string;
  nameEnglish?: string;
  nameRussian?: string;
  definition?: string;
  examples?: { [key: string]: string }[];
  listOfWordPackIds?: number[];
}
