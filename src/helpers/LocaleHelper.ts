import { Locale } from '@utils/constants';
import { Language, UserDto } from '@utils/types';

export default class LocaleHelper {
  public static getLocaleFromUser(user: UserDto): Locale {
    switch (user.interfaceLanguage) {
      case Language.ENGLISH: return Locale.EN_US;
      case Language.RUSSIAN: return Locale.RU;
      case Language.CHINESE: return Locale.CN;
      default: return Locale.EN_US;
    }
  }
}
