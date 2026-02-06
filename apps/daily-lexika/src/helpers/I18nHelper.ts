import WordDataHelper from '@daily-lexika/helpers/WordDataHelper';
import { Category } from '@library/daily-lexika';
import { TFunction } from 'i18next';

export default class I18nHelper {
  public static getWordPackCategoryTranslated(wordPackCategory: Category, t: TFunction<"translation", undefined>) {
    const prefix = 'database.wordPacks.category.';
    const translation = t(`${prefix}${Category[wordPackCategory as keyof typeof Category]}`);
    if (translation.startsWith(prefix)) return wordPackCategory;
    return translation;
  }

  public static getWordPackNameTranslated(wordPackName: string, t: TFunction<"translation", undefined>) {
    const originalWordPackName = WordDataHelper.getOriginalWordPackName(wordPackName);
    const prefix = 'database.wordPacks.name.';
    const translation = t(`${prefix}${originalWordPackName}`);
    if (translation.startsWith(prefix)) return originalWordPackName;
    return translation;
  }
}
