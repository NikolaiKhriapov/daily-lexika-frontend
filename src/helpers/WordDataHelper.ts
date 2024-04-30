import { RoleName } from '@utils/app/constants';
import { Language, UserDto, WordDataDto, WordDto } from '@utils/types';

export default class WordDataHelper {
  public static getAvailableTranslationLanguages(user: UserDto) {
    switch (user.role) {
      case RoleName.USER_ENGLISH: return [Language.ENGLISH, Language.RUSSIAN];
      case RoleName.USER_CHINESE: return [Language.ENGLISH, Language.CHINESE];
      default: return [];
    }
  }

  public static getWordDataNameByUserRole(wordData: WordDataDto, user: UserDto) {
    switch (user.role) {
      case RoleName.USER_ENGLISH: return wordData.nameEnglish;
      case RoleName.USER_CHINESE: return wordData.nameChineseSimplified.length < 100
        ? wordData.nameChineseSimplified
        : wordData.nameChineseSimplified.substring(0, 100).concat('...');// TODO::: remove after revising all Chinese words
      default: return '';
    }
  }

  public static getWordNameByUserRole(word: WordDto, user: UserDto) {
    return WordDataHelper.getWordDataNameByUserRole(word.wordDataDto, user);
  }

  public static getWordDataTranslation(wordData: WordDataDto, user: UserDto) {
    switch (user.translationLanguage) {
      case Language.ENGLISH: return wordData.nameEnglish;
      case Language.RUSSIAN: return wordData.nameRussian;
      case Language.CHINESE: return wordData.nameChineseSimplified.length < 100
        ? wordData.nameChineseSimplified
        : wordData.nameChineseSimplified.substring(0, 100).concat('...');// TODO::: remove after revising all Chinese words
      default: return '';
    }
  }

  public static getWordTranslation(word: WordDto, user: UserDto) {
    return WordDataHelper.getWordDataTranslation(word.wordDataDto, user);
  }

  public static getWordDataTranslationWithoutDuplicate(wordData: WordDataDto, user: UserDto) {
    switch (user.translationLanguage) {
      case Language.ENGLISH: return user.role !== RoleName.USER_ENGLISH ? wordData.nameEnglish : '';
      case Language.RUSSIAN: return wordData.nameRussian;
      case Language.CHINESE: return user.role !== RoleName.USER_CHINESE ? wordData.nameChineseSimplified : '';
      default: return wordData.nameEnglish;
    }
  }

  public static getWordTranslationWithoutDuplicate(word: WordDto, user: UserDto) {
    return WordDataHelper.getWordDataTranslationWithoutDuplicate(word.wordDataDto, user);
  }

  public static getOriginalWordPackName(wordPackName: string, user: UserDto | null) {
    const postfix = `__${user?.id}`;
    const prefixEn = 'EN__';
    const prefixCh = 'CH__';

    if (user && wordPackName.endsWith(postfix)) wordPackName = wordPackName.replace(postfix, '');
    if (user && (wordPackName.startsWith(prefixEn))) wordPackName = wordPackName.replace(prefixEn, '');
    if (user && (wordPackName.startsWith(prefixCh))) wordPackName = wordPackName.replace(prefixCh, '');
    return wordPackName;
  }

  public static removeAccent(str: string) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  public static sortWordDataChineseByTranscription(a: WordDataDto, b: WordDataDto) {
    const nameA = WordDataHelper.removeAccent(a.transcription).toLowerCase();
    const nameB = WordDataHelper.removeAccent(b.transcription).toLowerCase();

    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  }

  public static toSentenceCase(value: string) {
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  }

  public static checkAgainstSearchQuery(wordData: WordDataDto, searchQuery: string, user: UserDto) {
    switch (user.role) {
      case RoleName.USER_ENGLISH: return wordData.nameEnglish.toLowerCase().startsWith(searchQuery.toLowerCase());
      case RoleName.USER_CHINESE: return WordDataHelper.removeAccent(wordData.nameChineseSimplified).toLowerCase().includes(searchQuery.toLowerCase())
        || WordDataHelper.removeAccent(wordData.transcription).toLowerCase().startsWith(searchQuery.toLowerCase());
      default: return null;
    }
  }
}
