export default class DateHelper {
  public static convertOffsetDateTimeToDateString(offsetDateTimeString: string) {
    const timestampInMilliseconds = parseFloat(offsetDateTimeString) * 1000;
    const date = new Date(timestampInMilliseconds);

    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  }
}
