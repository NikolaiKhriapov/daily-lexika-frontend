import { Locale } from '../locale/enumerations';

export class DateTimeUtil {
  private static OPTIONS_DATE_TIME_FORMAT: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };

  public static convertDateToLocaleDateString(date: Date, locale: Locale) {
    return date.toLocaleDateString(locale, this.OPTIONS_DATE_TIME_FORMAT);
  }

  public static convertOffsetDateTimeToDateString(offsetDateTimeString: string, locale: Locale) {
    const timestampInMilliseconds = parseFloat(offsetDateTimeString) * 1000;
    const date = new Date(timestampInMilliseconds);
    return this.convertDateToLocaleDateString(date, locale);
  }

  public static getDateAfterDaysMidnightUtc(days: number) {
    const now = new Date();
    return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + days));
  }

  public static getDateAfterDaysMidnightUtcAsDateString(days: number, locale: Locale) {
    const date = this.getDateAfterDaysMidnightUtc(days);
    return this.convertDateToLocaleDateString(date, locale);
  }

  public static getTimeUntilMidnightUtcPlusDays(days: number) {
    return this.getDateAfterDaysMidnightUtc(days + 1).getTime() - new Date().getTime();
  }

  public static formatTimeDifference(diff: number) {
    const hours = String(Math.floor(diff / 3600000)).padStart(2, '0');
    const minutes = String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0');
    const seconds = String(Math.floor((diff % 60000) / 1000)).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  }
}
