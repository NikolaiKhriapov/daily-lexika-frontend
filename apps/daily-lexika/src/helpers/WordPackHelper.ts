import { Language, UserDto, WordPackUserDto } from '@library/daily-lexika';

export default class WordPackHelper {
  public static getDescriptionForLanguage(wordPack: WordPackUserDto, user: UserDto) {
    if (!wordPack.description.includes('\n')) {
      return wordPack.description;
    }

    const wordPackDescriptionArray = wordPack.description.split('\n');
    switch (user.interfaceLanguage) {
      case Language.ENGLISH: return wordPackDescriptionArray[0];
      case Language.RUSSIAN: return wordPackDescriptionArray[1];
      case Language.CHINESE: return wordPackDescriptionArray[2];
      default: return [];
    }
  }
}
