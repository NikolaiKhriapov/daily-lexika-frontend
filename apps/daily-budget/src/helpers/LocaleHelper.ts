import { Language, UserDto } from '@library/daily-lexika';
import { Locale } from '@library/shared/utils';

export default class LocaleHelper {
  public static getLocaleFromUser(user: UserDto): Locale {
    switch (user.interfaceLanguage) {
      case Language.ENGLISH: return Locale.EN_US;
      case Language.RUSSIAN: return Locale.RU;
      default: return Locale.EN_US;
    }
  }
}
