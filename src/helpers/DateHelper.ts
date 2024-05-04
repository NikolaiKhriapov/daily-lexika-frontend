export default class DateHelper {
  public static convertStringToDate(dateString: string) {
    const [year, month, day] = dateString as unknown as number[];
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(year, month - 1, day).toLocaleDateString(undefined, options);
  }
}
