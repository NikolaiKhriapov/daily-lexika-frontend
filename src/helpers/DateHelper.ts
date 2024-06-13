export default class DateHelper {
  public static convertOffsetDateTimeToDateString(offsetDateTimeString: string, locale: string) {
    const timestampInMilliseconds = parseFloat(offsetDateTimeString) * 1000;
    const date = new Date(timestampInMilliseconds);

    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString(locale, options);
  }

  public static getNextMidnightUtc() {
    const now = new Date();
    return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1));
  }

  public static formatTimeDifference(diff: number) {
    const hours = String(Math.floor(diff / 3600000)).padStart(2, '0');
    const minutes = String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0');
    const seconds = String(Math.floor((diff % 60000) / 1000)).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  }
}
